(function () {
  'use strict'
  
  var dbConfig = require('./config/db-config'),
      expressConfig = require('./config/express-config'),
      death = require('death');

  dbConfig.init();
  expressConfig.init(dbConfig);

  death(function (signal, err) {
    dbConfig.kill();
    process.exit();
  });
} ());