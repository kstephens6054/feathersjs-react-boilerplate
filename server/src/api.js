const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const apiHooks = require('./api.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const api = express(feathers());

// Load API configuration
api.configure(configuration());

// Enable security, CORS, compression, favicon and body parsing
api.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
api.use(cors());
api.use(compress());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
api.configure(express.rest());
api.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
api.configure(middleware);
api.configure(authentication);
// Set up our services (see `services/index.js`)
api.configure(services);
// Set up event channels (see channels.js)
api.configure(channels);

// Configure a middleware for 404s and the error handler
api.use(express.notFound());
api.use(express.errorHandler({ logger }));

api.hooks(apiHooks);

module.exports = api;
