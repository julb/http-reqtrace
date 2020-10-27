const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('http');
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({ includeMethod: true });
const port = process.env.PORT || 80;

const app = express();
app.use(metricsMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allRoute = require('./routes/all');

app.all('/status/:statusCode', allRoute.all);
app.all('*', allRoute.all);

app.listen(port, () => debug('App started on port', port));
