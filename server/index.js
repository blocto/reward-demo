/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const api = require('./api');

const port = 3001;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', api);

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
