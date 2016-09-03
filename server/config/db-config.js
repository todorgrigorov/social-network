(function () {
    var mongoose = require('mongoose');

    module.exports = {
        init: function () {
            mongoose.connect(_connectionString);
        },
        getConnection: function() {
            return mongoose.connection;
        },
        kill: function () {
            mongoose.connection.close();
        }
    };

    var _connectionString = 'mongodb://localhost:27017/social-network';
} ());
