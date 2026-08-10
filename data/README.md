# GeoGraph data

GeoGraph separates reviewed application data from third-party geometry.

- `seed/people.json` is the reviewed first-person slice. Each person points to a named source, and each event inherits that source until event-level citations are added.
- Historical boundary files are intentionally not vendored. Run `scripts/data/import_historical_basemaps.py` with either an existing checkout or an explicit download cache.
- The upstream `historical-basemaps` project is GPL-3.0, is a work in progress, and asks users to verify its maps before academic use. Imported database content must retain that attribution and license.
- CShapes 2.0 is a stronger option for 1886–2019, but its CC BY-NC-SA 4.0 license is non-commercial. It is not imported by default.

The UI must never treat a missing snapshot as proof that no polity existed. It displays a neutral, uncoloured land surface and a qualitative coverage label instead.
