# GeoGraph data

GeoGraph separates reviewed application data from third-party geometry.

- `seed/people-manifest.json` is the reviewed import entry point. It composes the base `people.json` slice with reviewed expansion files; each person points to a named source, and each event inherits that source until event-level citations are added.
- Historical boundary files are intentionally not vendored. Run `scripts/data/import_historical_basemaps.py` with either an existing checkout or an explicit download cache.
- To prefill and validate the complete local download cache before running the demo, use `python3 scripts/data/cache_historical_basemaps.py`. It tries the upstream GitHub raw URL first and its jsDelivr mirror second, and atomically installs only valid GeoJSON feature collections.
- When the requested start year is between snapshots, the importer clips and carries forward the nearest earlier snapshot, preserving its original `SNAPSHOT_YEAR` in the record notes.
- The upstream `historical-basemaps` project is GPL-3.0, is a work in progress, and asks users to verify its maps before academic use. Imported database content must retain that attribution and license.
- CShapes 2.0 is a stronger option for 1886–2019, but its CC BY-NC-SA 4.0 license is non-commercial. It is not imported by default.

The UI must never treat a missing snapshot as proof that no polity existed. It displays a neutral, uncoloured land surface and a qualitative coverage label instead.
