const debug = require('debug')('http');

module.exports = {
    all: function (req, res) {
        let httpCode = 200;
        let latencyInMs = 0;

        // Manage status code.
        if (req.params.statusCode) {
            httpCode = parseInt(req.params.statusCode, 10);
            if (isNaN(httpCode) || httpCode < 200 || httpCode > 599) {
                httpCode = 400;
            }
        }

        // Manage latency.
        if (req.query.latencyInMs) {
            latencyInMs = parseInt(req.query.latencyInMs, 10);
            if (isNaN(latencyInMs) || latencyInMs < 0) {
                latencyInMs = 0;
            }
        }

        const url = req.protocol + '://' + req.hostname + req.originalUrl;
        debug('> [%s] HTTP/%s %s', req.method, req.httpVersion, url);
        for (const header in req.headers) {
            debug('>>     Header : %s : %s', header, req.get(header));
        }
        debug('>>     Query  : %O', req.query);
        debug('>>     Body   : %O', req.body);

        if (latencyInMs > 0) {
            debug('<< Waiting for timeout exhaust (ms): %s', latencyInMs);

            setTimeout(() => {
                debug('< [ HTTP %s ]', httpCode);
                if (httpCode >= 200 && httpCode < 400) {
                    res.status(httpCode).send({ statusCode: httpCode, message: 'OK' });
                } else {
                    res.status(httpCode).send({ statusCode: httpCode, message: 'KO' });
                }
            }, latencyInMs);
        } else {
            debug('< [ HTTP %s ]', httpCode);
            if (httpCode >= 200 && httpCode < 400) {
                res.status(httpCode).send({ statusCode: httpCode, message: 'OK' });
            } else {
                res.status(httpCode).send({ statusCode: httpCode, message: 'KO' });
            }
        }
    },
};
