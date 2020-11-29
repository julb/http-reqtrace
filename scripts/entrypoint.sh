#!/bin/sh
exec gunicorn -t 300 -w 4 -b 0.0.0.0:$PORT http_reqtrace.__main__:app