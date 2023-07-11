## Getting started
cp .env.example .env

Build image

RUN sh build.sh

Rename image after build in docker-compose => container webapp

RUN docker-compose up -d => open http://127.0.0.1:3080/api/docs#/ to get swagger ui