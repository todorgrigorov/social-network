(function () {
    var UserController = require('../controllers/user-controller'),
        PersonController = require('../controllers/person-controller'),
        PostController = require('../controllers/post-controller');

    module.exports = {
        init: function (express) {
            _express = express;
            _initControllerRoutes(UserController);
            _initControllerRoutes(PersonController);
            _initControllerRoutes(PostController);
        }
    };

    function _initControllerRoutes(controller) {
        _express.get(_createRoute(controller), controller.read);
        _express.post(_createRoute(controller), controller.create);
        _express.put(_createRoute(controller), controller.update);
        _express.delete(_createRoute(controller), controller.delete);
    }

    function _createRoute(controller) {
        return _baseUri + '/' + controller.name;
    }

    var _express = null,
        _baseUri = '/api';
} ());