#!/usr/bin/env python3
"""Import event-driven snapshots from a local or downloaded historical-basemaps checkout.

The upstream project is GPL-3.0 and explicitly describes itself as work in progress.
GeoGraph keeps its precision value and source identifier so the UI can avoid presenting
the geometry as uniformly authoritative.
"""

from __future__ import annotations

import argparse
import colorsys
import hashlib
import json
import os
import re
import urllib.request
import uuid
from datetime import date
from pathlib import Path

import psycopg

NAMESPACE = uuid.UUID("10cd0145-c174-4c70-957f-a2cf43abf83e")
RAW_ROOT = "https://raw.githubusercontent.com/aourednik/historical-basemaps/master"


def stable_id(kind: str, key: str) -> uuid.UUID:
    return uuid.uuid5(NAMESPACE, f"{kind}:{key}")


def color_for(name: str) -> str:
    digest = hashlib.sha256(name.encode("utf-8")).digest()
    hue = int.from_bytes(digest[:2], "big") / 65535
    saturation = 0.48 + digest[2] / 255 * 0.18
    lightness = 0.48 + digest[3] / 255 * 0.12
    red, green, blue = colorsys.hls_to_rgb(hue, lightness, saturation)
    return f"#{round(red * 255):02X}{round(green * 255):02X}{round(blue * 255):02X}"


def entity_slug(name: str) -> str:
    readable = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:40]
    suffix = hashlib.sha1(name.encode("utf-8")).hexdigest()[:8]
    return f"{readable or 'entity'}-{suffix}"


def following_snapshot_end(next_year: int | None) -> int | None:
    if next_year is None:
        return None
    if next_year == 1:
        return -1
    return next_year - 1


def load_json(path: Path | None, url: str, cache_path: Path | None) -> dict:
    if path is not None:
        return json.loads(path.read_text(encoding="utf-8"))
    if cache_path and cache_path.exists():
        return json.loads(cache_path.read_text(encoding="utf-8"))
    with urllib.request.urlopen(url) as response:
        body = response.read()
    if cache_path:
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        cache_path.write_bytes(body)
    return json.loads(body)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--database-url", default=os.getenv("DATABASE_URL", "postgres://geograph:geograph@localhost:5432/geograph"))
    parser.add_argument("--source-dir", type=Path, help="Local checkout containing index.json and geojson/")
    parser.add_argument("--download-cache", type=Path, help="Opt-in cache directory for downloading the GPL-3.0 upstream data")
    parser.add_argument("--from-year", type=int, default=-1046)
    parser.add_argument("--to-year", type=int, default=2026)
    args = parser.parse_args()
    if args.source_dir is None and args.download_cache is None:
        parser.error("Pass --source-dir for an existing checkout or --download-cache to explicitly download the open dataset.")

    index_path = args.source_dir / "index.json" if args.source_dir else None
    index_cache = args.download_cache / "index.json" if args.download_cache else None
    index = load_json(index_path, f"{RAW_ROOT}/index.json", index_cache)
    snapshots = [item for item in index["years"] if args.from_year <= item["year"] <= args.to_year and item["year"] != 0]
    snapshots.sort(key=lambda item: item["year"])
    source_id = stable_id("source", "aourednik-historical-basemaps")

    with psycopg.connect(args.database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO sources(id,title,author_or_institution,url,license,accessed_on,notes)
                VALUES (%s,%s,%s,%s,%s,%s,%s)
                ON CONFLICT (id) DO UPDATE SET accessed_on=excluded.accessed_on, notes=excluded.notes
                """,
                (source_id, "Historical boundaries of world countries and cultural regions", "André Ourednik and contributors",
                 "https://github.com/aourednik/historical-basemaps", "GPL-3.0", date(2026, 8, 10),
                 "Work in progress; upstream asks users to verify maps against other sources. BORDERPRECISION is preserved."),
            )

            for snapshot_index, snapshot in enumerate(snapshots):
                local_path = args.source_dir / "geojson" / snapshot["filename"] if args.source_dir else None
                cache_path = args.download_cache / "geojson" / snapshot["filename"] if args.download_cache else None
                collection = load_json(local_path, f"{RAW_ROOT}/geojson/{snapshot['filename']}", cache_path)
                next_year = snapshots[snapshot_index + 1]["year"] if snapshot_index + 1 < len(snapshots) else None
                valid_to = following_snapshot_end(next_year)

                for feature_index, feature in enumerate(collection.get("features", [])):
                    properties = feature.get("properties") or {}
                    name = str(properties.get("NAME") or "").strip()
                    geometry = feature.get("geometry")
                    if not name or not geometry or geometry.get("type") not in {"Polygon", "MultiPolygon"}:
                        continue
                    entity_id = stable_id("entity", name)
                    slug = entity_slug(name)
                    precision = int(properties.get("BORDERPRECISION") or 1)
                    precision = min(3, max(1, precision))
                    confidence = {1: "low", 2: "medium", 3: "high"}[precision]
                    cursor.execute(
                        """
                        INSERT INTO political_entities(id,slug,name_zh,name_en,aliases,summary,primary_color)
                        VALUES (%s,%s,%s,%s,'{}','',%s)
                        ON CONFLICT (id) DO UPDATE SET name_en=excluded.name_en
                        """,
                        (entity_id, slug, name, name, color_for(name)),
                    )
                    version_id = stable_id("territory", f"{snapshot['year']}:{feature_index}:{name}")
                    cursor.execute(
                        """
                        INSERT INTO territory_versions(id,entity_id,valid_from_year,valid_to_year,control_type,confidence,
                          border_precision,geometry,source_id,source_feature_id,notes)
                        VALUES (%s,%s,%s,%s,'actual',%s,%s,
                          ST_Multi(ST_CollectionExtract(ST_MakeValid(ST_SetSRID(ST_GeomFromGeoJSON(%s),4326)),3)),%s,%s,%s)
                        ON CONFLICT (id) DO UPDATE SET valid_to_year=excluded.valid_to_year, geometry=excluded.geometry,
                          confidence=excluded.confidence, border_precision=excluded.border_precision
                        """,
                        (version_id, entity_id, snapshot["year"], valid_to, confidence, precision, json.dumps(geometry),
                         source_id, f"{snapshot['filename']}#{feature_index}",
                         f"PARTOF={properties.get('PARTOF') or ''}; SUBJECTO={properties.get('SUBJECTO') or ''}"),
                    )
                connection.commit()
                print(f"Imported {snapshot['year']}: {len(collection.get('features', []))} features")


if __name__ == "__main__":
    main()
