import json
import tempfile
import unittest
from pathlib import Path

from scripts.data.cache_historical_basemaps import snapshots_requiring_download, store_snapshot


class HistoricalCacheTests(unittest.TestCase):
    def test_finds_missing_and_invalid_snapshots(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            cache_root = Path(directory)
            geojson = cache_root / "geojson"
            geojson.mkdir()
            (geojson / "valid.geojson").write_text(
                json.dumps({"type": "FeatureCollection", "features": []}),
                encoding="utf-8",
            )
            (geojson / "invalid.geojson").write_text("{}", encoding="utf-8")
            index = {"years": [
                {"year": 1, "filename": "valid.geojson"},
                {"year": 2, "filename": "invalid.geojson"},
                {"year": 3, "filename": "missing.geojson"},
            ]}

            self.assertEqual(
                [item["filename"] for item in snapshots_requiring_download(index, cache_root)],
                ["invalid.geojson", "missing.geojson"],
            )

    def test_stores_only_valid_feature_collections(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "snapshot.geojson"
            valid = json.dumps({"type": "FeatureCollection", "features": [{"type": "Feature"}]}).encode()

            self.assertEqual(store_snapshot(valid, destination), 1)
            self.assertTrue(destination.exists())
            self.assertFalse(destination.with_suffix(".geojson.part").exists())

            with self.assertRaises(ValueError):
                store_snapshot(b'{"type":"FeatureCollection","features":{}}', destination)
            self.assertEqual(json.loads(destination.read_text())["features"], [{"type": "Feature"}])


if __name__ == "__main__":
    unittest.main()
