/* eslint-disable no-console */
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const path = require('path');
const favicon = require('serve-favicon');

const logger = require('./logger');
const api = require('./api');

const app = express(feathers());
app.configure(configuration());

const port = app.get('port');
const apiBaseURL = app.get('apiBaseURL');

// Host the public folder
app.use('/', express.static(app.get('public')));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the API
app.use(apiBaseURL, api);

// Run the server
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port
  )
);
