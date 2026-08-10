FROM python:3.14-slim
WORKDIR /app
COPY scripts/data/requirements.txt ./scripts/data/requirements.txt
RUN pip install --no-cache-dir -r scripts/data/requirements.txt
COPY scripts/data ./scripts/data
COPY data/seed ./data/seed
CMD ["python", "scripts/data/seed_people.py"]
