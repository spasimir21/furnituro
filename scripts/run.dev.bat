@echo off

set COMPOSE_DOCKER_CLI_BUILD=1
set DOCKER_BUILDKIT=1

cd ..

echo Starting platform...
call docker-compose -f ./docker-compose.dev.yml up %1
