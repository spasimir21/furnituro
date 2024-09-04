#! /bin/bash

export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1

cd ..

echo Starting platform...
docker-compose -f ./docker-compose.dev.yml up $1
