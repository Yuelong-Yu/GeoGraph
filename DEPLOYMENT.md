# GeoGraph production deployment

GeoGraph is published below the ChronChaos origin at `/geograph/`. It remains a
Docker Compose application: the public Nginx proxy is the only process exposed
to the internet, while the Compose Web container listens on `127.0.0.1:8080`.

## Server environment

Create an ignored `/var/www/GeoGraph/.env` with:

```dotenv
GEOGRAPH_BASE_PATH=/geograph/
```

The checked-in Compose project name is fixed to `geograph`, so the PostGIS
volume persists across release-directory switches. Do not run `docker compose
down -v` on production.

## First deployment

From the checked-out release directory:

```bash
docker compose --env-file .env up -d --build
docker compose --env-file .env ps
curl --fail http://127.0.0.1:8080/health
```

The data container imports the reviewed people dataset before the API starts.
The complete historical-boundary import is separate because the source data is
GPL-3.0 and can take substantially longer:

```bash
docker compose --env-file .env --profile historical run --rm historical-data
```

Run this only after accepting the upstream data licence and after the database
is healthy. The historical cache and PostGIS volume are Docker-managed named
volumes; preserve both during ordinary releases.

## Nginx integration

Install the `/geograph/` locations from ChronChaos's
`ops/nginx/chronchaos.conf`, then validate and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

The proxy strips `/geograph/` before forwarding to the internal Web container;
the production build must therefore use `GEOGRAPH_BASE_PATH=/geograph/` so
browser asset, Cesium, and API requests retain the public prefix.

## Release verification

```bash
curl --fail --location https://chronchaos.com/geograph/
curl --fail https://chronchaos.com/geograph/health
curl --fail 'https://chronchaos.com/geograph/api/world?year=2026'
```

Also verify the ChronChaos homepage's **GeoGraph / 文明转捩** card enters the
application and that the map, people search, and time slider work.
