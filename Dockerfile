FROM node:10

COPY src/ src/
COPY classdef.json package.json package-lock.json tsconfig.json ./

RUN npm i && npm install -g typescript && npm install -g ts-node
