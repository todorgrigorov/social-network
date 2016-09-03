(function () {
    var Controller = require('./controller'),
        User = require('../models/user');

    module.exports = Controller.init(User);
}());