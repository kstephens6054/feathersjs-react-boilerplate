/* eslint-disable no-console */
const express = require('@feathersjs/express');
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const baseURL = app.get('baseURL');

const api = express().use(baseURL, app);
const server = api.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d%s',
    app.get('host'),
    port,
    baseURL
  )
);
