(function () {
    var express = require('express'),
        expressApp = express(),
        session = require('express-session'),
        MongoStore = require('connect-mongo').call(this, session),
        bodyParser = require('body-parser'),
        CookieParser = require('cookie-parser').call(this),
        passportConfig = require('./passport-config'),
        restConfig = require('./rest-config');

    module.exports = {
        init: function (dbConfig) {
            expressApp.use(session({
                store: new MongoStore({ mongooseConnection: dbConfig.getConnection() }),
                ttl: 1209600, // 14 days
                resave: false,
                saveUninitialized: false,
                cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
                secret: 'secret'
            }));
            expressApp.use(bodyParser.json());
            expressApp.use(bodyParser.urlencoded({ extended: true }));
            expressApp.use(CookieParser);
            passportConfig.init(expressApp, _root);
            restConfig.init(expressApp);
            initRoutes();

            expressApp.listen(_port, function () {
                console.log('PORT: ' + _port);
            });
        }
    };

    function initRoutes() {
        expressApp.use('/scripts', express.static(_root + '/node_modules'));
        expressApp.use('/views', express.static(_root + '/client/views'));
        expressApp.use('/config', express.static(_root + '/client/config'));
        expressApp.use('/content', express.static(_root + '/client/content'));
        expressApp.use('/controllers', express.static(_root + '/client/controllers'));
        expressApp.use('/directives', express.static(_root + '/client/directives'));
        expressApp.use('/services', express.static(_root + '/client/services'));
        expressApp.all('*', passportConfig.restrict);
        expressApp.get('*', function (req, res, next) {
            res.sendFile(_root + '/client/index.html');
        });
    }

    var _port = process.env.PORT || 3000,
        _root = __dirname.replace('\\server\\config', '');;
} ());