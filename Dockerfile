FROM python:3.8-alpine

ENV PORT=8080

RUN mkdir /app

WORKDIR /app

ADD scripts/entrypoint.sh /app

ARG PACKAGE_VERSION

RUN pip --no-cache-dir install http-reqtrace==$PACKAGE_VERSION

CMD ["./entrypoint.sh"]
