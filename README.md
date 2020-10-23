[![npm version](https://img.shields.io/npm/v/http-reqtrace.svg)](https://www.npmjs.com/http-reqtrace)
[![license](https://img.shields.io/npm/l/http-reqtrace.svg)](https://www.npmjs.com/http-reqtrace)
[![downloads](https://img.shields.io/npm/dm/http-reqtrace.svg)](https://www.npmjs.com/http-reqtrace)
[![docker-build-status](https://img.shields.io/docker/build/julb/http-reqtrace.svg)](https://hub.docker.com/r/julb/http-reqtrace)
[![docker-automated-build](https://img.shields.io/docker/automated/julb/http-reqtrace.svg)](https://hub.docker.com/r/julb/http-reqtrace)
[![docker-pulls](https://img.shields.io/docker/pulls/julb/http-reqtrace.svg)](https://hub.docker.com/r/julb/http-reqtrace)

# http-reqtrace

## Description

The application starts a Web server which logs details of all incoming HTTP requests such as:

-   HTTP Method & URL
-   Query params
-   Headers
-   Body

The application accepts all HTTP methods and URIs.
The routing is defined like this:

-   `/status/:statusCode` : return an HTTP response with status code **statusCode** and body `{"message":"OK|KO"}`
-   `/**/*` : return an HTTP response with status code **200 OK** and body `{"message":"OK"}`

Following query parameters are also supported:

-   `?latencyInMs=60000` : wait for the given period in milliseconds before responding.

This service can be used to :

-   See very quickly what are the requests received and inspect their content.
-   Have a quick way to simulate specific cases with particular HTTP response codes.

## How to use

### Starts the service

-   Run container as root:

```bash
$ docker run -ti --name http-reqtrace -p 80:80 julb/http-reqtrace:latest
```

-   Run container as non-root:

```bash
$ docker run -ti --name http-reqtrace -p 80:8080 -e PORT=8080 -u 65534:65534 julb/http-reqtrace:latest
```

Note: the `PORT` environment variable can be set to customize listening port.

### Request the service with any method, URI and parameters

```bash
$ curl http://localhost/context/uri?param1=value1&param2=value2 -H "Authorization: Bearer jwt"
{"statusCode": 200,"message":"OK"}
```

```bash
http > [ GET ] HTTP/ 1.1   http://localhost/context/uri?param1=value1&param2=value2
http >>     Header :  host : localhost
http >>     Header :  user-agent : curl/7.54.0
http >>     Header :  accept : */*
http >>     Header :  authorization : Bearer jwt
http >>     Query  :  { param1: 'value1', param2: 'value2' }
http >>     Body   :  {}
http < [ HTTP 200 ]
```

### Getting specific HTTP responses status codes

```bash
$ curl http://localhost/status/404 -H "Authorization: Bearer jwt"
{"statusCode":404,"message":"KO"}

$ curl http://localhost/status/500 -H "Authorization: Bearer jwt"
{"statusCode":500,"message":"KO"}
```

```bash
http > [ GET ] HTTP/ 1.1   http://localhost/status/404
http >>     Header :  host : localhost
http >>     Header :  user-agent : curl/7.54.0
http >>     Header :  accept : */*
http >>     Header :  authorization : Bearer jwt
http >>     Query  : {}
http >>     Body   : {}
http < [ HTTP 404 ]
http > [ GET ] HTTP/ 1.1   http://localhost/status/500
http >>     Header :  host : localhost
http >>     Header :  user-agent : curl/7.54.0
http >>     Header :  accept : */*
http >>     Header :  authorization : Bearer jwt
http >>     Query  : {}
http >>     Body   : {}
http < [ HTTP 500 ]
```

### Simulate latency

```bash
$ curl http://localhost/status/504?latencyInMs=60000
{"statusCode":504,"message":"KO"}
```

```bash
http > [ GET ] HTTP/ 1.1   http://localhost/status/504
http >>     Header :  host : localhost
http >>     Header :  user-agent : curl/7.54.0
http >>     Header :  accept : */*
http >>     Query  : {}
http >>     Body   : {}
<60s waiting...>
http < [ HTTP 504 ]
```
