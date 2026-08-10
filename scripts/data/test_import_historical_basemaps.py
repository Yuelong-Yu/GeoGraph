import unittest

from scripts.data.import_historical_basemaps import color_for, select_snapshots


class SnapshotSelectionTests(unittest.TestCase):
    def test_carries_the_last_snapshot_before_the_requested_start(self) -> None:
        index = {"years": [
            {"year": -1500, "filename": "world_bc1500.geojson"},
            {"year": -1000, "filename": "world_bc1000.geojson"},
            {"year": -700, "filename": "world_bc700.geojson"},
        ]}

        selected = select_snapshots(index, -1046, -700)

        self.assertEqual([item["effective_year"] for item in selected], [-1046, -1000, -700])
        self.assertEqual(selected[0]["year"], -1500)

    def test_taiwan_uses_chinas_fixed_identity_colour(self) -> None:
        self.assertEqual(color_for("Taiwan"), color_for("China"))
        self.assertNotEqual(color_for("Taiwanese Tribes"), color_for("China"))


if __name__ == "__main__":
    unittest.main()
