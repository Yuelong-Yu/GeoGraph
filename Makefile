.PHONY: setup dev test build historical-data

setup:
	npm install
	docker compose up -d --wait db
	npm run db:migrate
	python3 -m venv scripts/data/.venv
	scripts/data/.venv/bin/pip install -r scripts/data/requirements.txt
	scripts/data/.venv/bin/python scripts/data/seed_people.py

dev:
	npm run dev

test:
	npm test

build:
	npm run build

historical-data:
	docker compose --profile historical run --rm historical-data
