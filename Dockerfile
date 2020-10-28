FROM node:14-alpine

WORKDIR /app

COPY package.json /app
COPY src /app/src

RUN npm install

ENV DEBUG=http
ENV DEBUG_DEPTH=10

ENTRYPOINT ["node", "src/index.js"]
