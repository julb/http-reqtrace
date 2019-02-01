const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('http');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allRoute = require('./routes/all');

app.all('/status/:statusCode', allRoute.all);
app.all('*', allRoute.all);

app.listen(80, () => debug('App started on port 80.'));
