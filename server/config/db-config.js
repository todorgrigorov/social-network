(function () {
    'use strict';

    module.exports = {
        init: function () {
            _mongoose.connect(_connectionString);
        },
        getConnection: function () {
            return _mongoose.connection;
        },
        kill: function () {
            _mongoose.connection.close();
        }
    };

    const _connectionString = 'mongodb://localhost:27017/social-network',
          _mongoose = require('mongoose');
} ());
