(function () {
  'use strict';

  const _dbConfig = require('./config/db-config'),
        _expressConfig = require('./config/express-config'),
        _death = require('death');

  _dbConfig.init();
  _expressConfig.init(_dbConfig);

  _death(function (signal, err) {
    _dbConfig.kill();
    process.exit();
  });
} ());