#!/usr/bin/env python3
"""Load the reviewed GeoGraph people dataset into PostgreSQL/PostGIS."""

from __future__ import annotations

import argparse
import json
import os
import uuid
from datetime import date
from pathlib import Path

import psycopg

NAMESPACE = uuid.UUID("a9511364-65df-47ac-9696-4344e0d40501")


def stable_id(kind: str, key: str) -> uuid.UUID:
    return uuid.uuid5(NAMESPACE, f"{kind}:{key}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--database-url", default=os.getenv("DATABASE_URL", "postgres://geograph:geograph@localhost:5432/geograph"))
    parser.add_argument("--input", type=Path, default=Path(__file__).parents[2] / "data/seed/people-manifest.json")
    args = parser.parse_args()
    manifest = json.loads(args.input.read_text(encoding="utf-8"))
    payloads = (
        [json.loads((args.input.parent / filename).read_text(encoding="utf-8")) for filename in manifest["files"]]
        if "files" in manifest
        else [manifest]
    )
    payload = {
        "sources": [source for part in payloads for source in part["sources"]],
        "people": [person for part in payloads for person in part["people"]],
    }
    source_ids: dict[str, uuid.UUID] = {}

    with psycopg.connect(args.database_url) as connection:
        with connection.cursor() as cursor:
            for source in payload["sources"]:
                source_id = stable_id("source", source["key"])
                source_ids[source["key"]] = source_id
                cursor.execute(
                    """
                    INSERT INTO sources(id, title, author_or_institution, url, license, accessed_on, notes)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (id) DO UPDATE SET title=excluded.title, author_or_institution=excluded.author_or_institution,
                      url=excluded.url, license=excluded.license, accessed_on=excluded.accessed_on, notes=excluded.notes
                    """,
                    (source_id, source["title"], source["institution"], source["url"], source["license"], date(2026, 8, 11), source["notes"]),
                )

            for person in payload["people"]:
                person_id = stable_id("person", person["slug"])
                source_id = source_ids[person["source"]]
                cursor.execute(
                    """
                    INSERT INTO people(id, slug, name_zh, name_en, aliases, birth_year, death_year, primary_field,
                      secondary_fields, summary, inclusion_reason, character_asset, source_id)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (id) DO UPDATE SET name_zh=excluded.name_zh, name_en=excluded.name_en, aliases=excluded.aliases,
                      birth_year=excluded.birth_year, death_year=excluded.death_year, primary_field=excluded.primary_field,
                      secondary_fields=excluded.secondary_fields, summary=excluded.summary,
                      inclusion_reason=excluded.inclusion_reason, character_asset=excluded.character_asset,
                      source_id=excluded.source_id
                    """,
                    (person_id, person["slug"], person["nameZh"], person["nameEn"], person["aliases"], person["birthYear"],
                     person["deathYear"], person["primaryField"], person["secondaryFields"], person["summary"],
                     person["inclusionReason"], f"/characters/{person['slug']}.png", source_id),
                )
                for event in person["events"]:
                    year, order, title, description, longitude, latitude = event
                    event_id = stable_id("person-event", f"{person['slug']}:{year}:{order}")
                    cursor.execute(
                        """
                        INSERT INTO person_events(id, person_id, event_year, event_order, kind, title, description,
                          longitude, latitude, source_id)
                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                        ON CONFLICT (id) DO UPDATE SET event_year=excluded.event_year, event_order=excluded.event_order,
                          kind=excluded.kind, title=excluded.title, description=excluded.description,
                          longitude=excluded.longitude, latitude=excluded.latitude, source_id=excluded.source_id
                        """,
                        (event_id, person_id, year, order, "biographical", title, description, longitude, latitude, source_id),
                    )
        connection.commit()
    print(f"Seeded {len(payload['people'])} people.")


if __name__ == "__main__":
    main()
