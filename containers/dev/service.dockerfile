FROM node:lts-alpine

WORKDIR /app

RUN npm install onchange -g

COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json

RUN npm ci --force

COPY ./prisma ./prisma

RUN npx prisma generate

COPY ./node.importmap ./node.importmap

ARG SERVICE

ENV SERVICE_TRACK_FILE=./dist/services/${SERVICE}/track.txt
ENV SERVICE_MAIN_FILE=./dist/services/${SERVICE}/index.js

CMD onchange -i -k -p 100 ${SERVICE_TRACK_FILE} -- node --enable-source-maps --loader @node-loader/import-maps ${SERVICE_MAIN_FILE}
