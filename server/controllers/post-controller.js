(function () {
    var Controller = require('./controller'),
        Post = require('../models/post');

    module.exports = Controller.init(Post);
}());