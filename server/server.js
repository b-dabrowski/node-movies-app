const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./util/logger');
const addGlobalMiddleware = require('./middleware/appMiddleware');
const api = require('./api/api');

const dbPromise = mongoose.connect(config.db.url, {
  useMongoClient: true,
});

dbPromise.then((db) => {
  db.model();
});

const app = express();

addGlobalMiddleware(app);

app.use('/api', api);

app.use((err, req, res, next) => {
  logger.error(err);

  res.status(500).json({
    errors: {
      error: err,
    },
  });
});

module.exports = app;
