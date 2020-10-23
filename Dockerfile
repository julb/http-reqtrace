FROM node:14-alpine

WORKDIR /app

COPY package.json /app
COPY src /app/src

RUN npm install

ENV DEBUG=http

ENTRYPOINT ["node", "src/index.js"]
