(function () {
    'use strict';

    module.exports = {
        init: function (express) {
            _models.forEach(model => {
                _initControllerRoutes(_factory.create(model), express);
            });
        }
    };

    function _initControllerRoutes(controller, express) {
        express.get(_createRoute(controller), controller.read);
        express.post(_createRoute(controller), controller.create);
        express.put(_createRoute(controller), controller.update);
        express.delete(_createRoute(controller), controller.delete);
    }

    function _createRoute(controller) {
        return `${_baseUri}/${controller.name}`;
    }

    const _factory = require('../controllers/controller-factory'),
          _baseUri = '/api',
          _models = ['user', 'person', 'post', 'comment'];
} ());