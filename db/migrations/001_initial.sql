CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS sources (
  id uuid PRIMARY KEY,
  title text NOT NULL,
  author_or_institution text NOT NULL,
  url text NOT NULL,
  license text NOT NULL,
  accessed_on date NOT NULL,
  notes text
);

CREATE TABLE IF NOT EXISTS political_entities (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name_zh text NOT NULL,
  name_en text,
  aliases text[] NOT NULL DEFAULT '{}',
  summary text NOT NULL DEFAULT '',
  primary_color char(7) NOT NULL CHECK (primary_color ~ '^#[0-9A-Fa-f]{6}$'),
  parent_id uuid REFERENCES political_entities(id),
  started_year integer CHECK (started_year <> 0),
  ended_year integer CHECK (ended_year <> 0)
);

CREATE TABLE IF NOT EXISTS territory_versions (
  id uuid PRIMARY KEY,
  entity_id uuid NOT NULL REFERENCES political_entities(id) ON DELETE CASCADE,
  valid_from_year integer NOT NULL CHECK (valid_from_year <> 0),
  valid_to_year integer CHECK (valid_to_year <> 0 AND valid_to_year >= valid_from_year),
  control_type text NOT NULL CHECK (control_type IN ('actual', 'claim', 'disputed', 'uncertain')),
  confidence text NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  border_precision smallint NOT NULL DEFAULT 1 CHECK (border_precision BETWEEN 1 AND 3),
  geometry geometry(MultiPolygon, 4326) NOT NULL,
  source_id uuid NOT NULL REFERENCES sources(id),
  source_feature_id text,
  notes text
);

CREATE INDEX IF NOT EXISTS territory_versions_year_idx
  ON territory_versions(valid_from_year, valid_to_year);
CREATE INDEX IF NOT EXISTS territory_versions_geometry_idx
  ON territory_versions USING gist(geometry);

CREATE TABLE IF NOT EXISTS people (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name_zh text NOT NULL,
  name_en text,
  aliases text[] NOT NULL DEFAULT '{}',
  birth_year integer NOT NULL CHECK (birth_year <> 0),
  death_year integer CHECK (death_year <> 0 AND death_year >= birth_year),
  primary_field text NOT NULL,
  secondary_fields text[] NOT NULL DEFAULT '{}',
  summary text NOT NULL DEFAULT '',
  inclusion_reason text NOT NULL DEFAULT '',
  character_asset text,
  source_id uuid NOT NULL REFERENCES sources(id)
);

CREATE INDEX IF NOT EXISTS people_name_zh_trgm_idx ON people USING gin (name_zh gin_trgm_ops);
CREATE INDEX IF NOT EXISTS people_name_en_trgm_idx ON people USING gin (name_en gin_trgm_ops);

CREATE TABLE IF NOT EXISTS person_events (
  id uuid PRIMARY KEY,
  person_id uuid NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  event_year integer NOT NULL CHECK (event_year <> 0),
  event_order smallint NOT NULL DEFAULT 1,
  kind text NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  longitude double precision NOT NULL CHECK (longitude BETWEEN -180 AND 180),
  latitude double precision NOT NULL CHECK (latitude BETWEEN -90 AND 90),
  source_id uuid NOT NULL REFERENCES sources(id),
  UNIQUE(person_id, event_year, event_order)
);

CREATE INDEX IF NOT EXISTS person_events_person_year_idx ON person_events(person_id, event_year, event_order);

CREATE TABLE IF NOT EXISTS successor_relations (
  predecessor_id uuid NOT NULL REFERENCES political_entities(id) ON DELETE CASCADE,
  successor_id uuid NOT NULL REFERENCES political_entities(id) ON DELETE CASCADE,
  relation_type text NOT NULL CHECK (relation_type IN ('political', 'territorial')),
  description text NOT NULL DEFAULT '',
  source_id uuid NOT NULL REFERENCES sources(id),
  PRIMARY KEY(predecessor_id, successor_id, relation_type)
);
