FROM python:3.12-slim

ENV POETRY_VERSION=2.0.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR="/var/cache/poetry"

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="$POETRY_HOME/bin:$PATH"
ENV POETRY_VIRTUALENVS_IN_PROJECT=true

COPY pyproject.toml poetry.lock ./

RUN apt-get update && apt-get install -y bash

COPY app app
COPY migrations migrations
COPY .env .env
COPY ClickZone.py config.py boot.sh ./
RUN chmod a+x boot.sh

RUN poetry install
RUN poetry add gunicorn

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]