FROM node:8-alpine

WORKDIR /app

COPY package.json /app
COPY src /app/src

RUN npm install

EXPOSE 80

ENV DEBUG=http

ENTRYPOINT ["node", "src/index.js"]
