const debug = require('debug')('http');

module.exports = {
    all: function(req, res) {
        let httpCode = 200;
        if (req.params.statusCode) {
            httpCode = parseInt(req.params.statusCode, 10);
            if (isNaN(httpCode) || httpCode < 200 || httpCode > 599) {
                httpCode = 400;
            }
        }

        const url = req.protocol + '://' + req.hostname + req.originalUrl;
        debug('> [', req.method, '] HTTP/', req.httpVersion, ' ', url);
        for (const header in req.headers) {
            debug('>>     Header : ', header, ':', req.get(header));
        }
        debug('>>     Query  :', req.query);
        debug('>>     Body   :', req.body);
        debug('< [ HTTP', httpCode, ']');

        if (httpCode >= 200 && httpCode < 400) {
            res.status(httpCode).send({ statusCode: httpCode, message: 'OK' });
        } else {
            res.status(httpCode).send({ statusCode: httpCode, message: 'KO' });
        }
    }
};
