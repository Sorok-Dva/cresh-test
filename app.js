const Env = require('./config/env');
const { ErrorHandler, Express } = require('./middlewares');
const express = require('express');
const logger = require('morgan');

const routes = require('./routes/index');
const app = express();

app.set('env', Env.current);

app.use(logger('dev'));
// ------ Express
app.use(express.json({ limit: '150mb' }));
app.use(Express.methodOverride);
app.use(Express.helmet);

// mount all routes on / path
app.use('/', routes);

app.use(ErrorHandler.notFoundError);
app.use(ErrorHandler.converter);
app.use(ErrorHandler.api);

module.exports = app;
