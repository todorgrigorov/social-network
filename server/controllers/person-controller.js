(function () {
    var Controller = require('./controller'),
        Person = require('../models/person');

    module.exports = Controller.init(Person);
}());