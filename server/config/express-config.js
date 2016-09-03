(function () {
    'use strict';

    module.exports = {
        init: function (dbConfig) {
            _expressApp.use(_session({
                store: new _MongoStore({ mongooseConnection: dbConfig.getConnection() }),
                ttl: 1209600, // 14 days
                resave: false,
                saveUninitialized: false,
                cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
                secret: 'secret'
            }));
            _expressApp.use(_bodyParser.json());
            _expressApp.use(_bodyParser.urlencoded({ extended: true }));
            _expressApp.use(_CookieParser);
            _passportConfig.init(_expressApp, _root);
            _restConfig.init(_expressApp);
            _initRoutes();

            _expressApp.listen(_port, () => { console.log(`PORT: ${_port}`); });
        }
    };

    function _initRoutes() {
        _expressApp.use('/scripts', _express.static(`${_root}/node_modules`));
        _expressApp.use('/views', _express.static(`${_root}/client/views`));
        _expressApp.use('/config', _express.static(`${_root}/client/config`));
        _expressApp.use('/content', _express.static(`${_root}/client/content`));
        _expressApp.use('/controllers', _express.static(`${_root}/client/controllers`));
        _expressApp.use('/directives', _express.static(`${_root}/client/directives`));
        _expressApp.use('/services', _express.static(`${_root}/client/services`));
        _expressApp.all('*', _passportConfig.restrict);
        _expressApp.get('*', (req, res) => { res.sendFile(`${_root}/client/index.html`); });
    }

    const _express = require('express'),
          _expressApp = _express(),
          _session = require('express-session'),
          _MongoStore = require('connect-mongo').call(this, _session),
          _bodyParser = require('body-parser'),
          _CookieParser = require('cookie-parser').call(this),
          _passportConfig = require('./passport-config'),
          _restConfig = require('./rest-config'),
          _port = process.env.PORT || 3000,
          _root = __dirname.replace('\\server\\config', '');
} ());