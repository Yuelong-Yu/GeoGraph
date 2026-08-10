#!/usr/bin/env python3
"""Download and validate every indexed historical-basemaps GeoJSON snapshot."""

from __future__ import annotations

import argparse
import json
import os
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

SOURCE_ROOTS = (
    "https://raw.githubusercontent.com/aourednik/historical-basemaps/master",
    "https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master",
)
DEFAULT_CACHE_ROOT = Path(__file__).resolve().parents[2] / "data" / "historical-cache"


def parse_feature_collection(body: bytes) -> dict:
    try:
        collection = json.loads(body)
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise ValueError("snapshot is not valid JSON") from error
    if collection.get("type") != "FeatureCollection" or not isinstance(collection.get("features"), list):
        raise ValueError("snapshot is not a GeoJSON FeatureCollection")
    return collection


def valid_snapshot(path: Path) -> bool:
    try:
        parse_feature_collection(path.read_bytes())
        return True
    except (OSError, ValueError):
        return False


def safe_filename(value: object) -> str:
    filename = str(value)
    if Path(filename).name != filename or not filename.endswith(".geojson"):
        raise ValueError(f"unsafe snapshot filename in index: {filename!r}")
    return filename


def snapshots_requiring_download(index: dict, cache_root: Path) -> list[dict]:
    missing = []
    for item in index.get("years", []):
        filename = safe_filename(item.get("filename"))
        if not valid_snapshot(cache_root / "geojson" / filename):
            missing.append(item)
    return missing


def store_snapshot(body: bytes, destination: Path) -> int:
    collection = parse_feature_collection(body)
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = destination.with_suffix(destination.suffix + ".part")
    temporary.write_bytes(body)
    os.replace(temporary, destination)
    return len(collection["features"])


def download(urls: list[str], timeout: int) -> bytes:
    failures = []
    for url in urls:
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "GeoGraph cache downloader"})
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return response.read()
        except (OSError, urllib.error.HTTPError) as error:
            failures.append(f"{url}: {error}")
    raise RuntimeError("; ".join(failures))


def load_index(cache_root: Path, timeout: int) -> dict:
    index_path = cache_root / "index.json"
    if index_path.exists():
        return json.loads(index_path.read_text(encoding="utf-8"))
    body = download([f"{root}/index.json" for root in SOURCE_ROOTS], timeout)
    index = json.loads(body)
    cache_root.mkdir(parents=True, exist_ok=True)
    temporary = index_path.with_suffix(".json.part")
    temporary.write_bytes(body)
    os.replace(temporary, index_path)
    return index


def cache_snapshot(item: dict, cache_root: Path, timeout: int) -> tuple[str, int]:
    filename = safe_filename(item.get("filename"))
    body = download([f"{root}/geojson/{filename}" for root in SOURCE_ROOTS], timeout)
    features = store_snapshot(body, cache_root / "geojson" / filename)
    return filename, features


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache-root", type=Path, default=DEFAULT_CACHE_ROOT)
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--timeout", type=int, default=120)
    args = parser.parse_args()
    if args.workers < 1 or args.timeout < 1:
        parser.error("--workers and --timeout must be positive")

    index = load_index(args.cache_root, args.timeout)
    missing = snapshots_requiring_download(index, args.cache_root)
    print(f"Indexed snapshots: {len(index.get('years', []))}; requiring download: {len(missing)}")
    if missing:
        with ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = [executor.submit(cache_snapshot, item, args.cache_root, args.timeout) for item in missing]
            for future in as_completed(futures):
                filename, features = future.result()
                print(f"Cached {filename}: {features} features")

    remaining = snapshots_requiring_download(index, args.cache_root)
    if remaining:
        raise SystemExit(f"Cache incomplete: {len(remaining)} snapshot(s) missing or invalid")
    print("Cache complete: every indexed snapshot is valid.")


if __name__ == "__main__":
    main()
