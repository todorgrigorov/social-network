(function () {
    'use strict';

    module.exports = {
        init: function (expressApp, root) {
            _root = root;
            expressApp.use(_passport.initialize());
            expressApp.use(_passport.session());
            expressApp.post('/login', _authorizationMiddleware);
            expressApp.get('/logout', function (req, res) {
                req.logout();
                res.status(200).send('');
            });
            expressApp.get('/user', function (req, res) {
                res.json(req.user);
            });

            _passport.serializeUser(function (user, done) {
                done(null, user.id);
            });

            _passport.deserializeUser(function (id, done) {
                _User.findById(id, function (error, user) {
                    done(error, user);
                });
            });

            _passport.use(new _passportLocal.Strategy(
                function (username, password, done) {
                    _User.findOne({ username: username }, function (error, user) {
                        if (error) {
                            return done(error);
                        } else if (!user || user.password !== password) {
                            return done(null, null);
                        } else {
                            return done(null, user);
                        }
                    });
                }
            ));
        },
        restrict: function (req, res, next) {
            let authenticated = req.isAuthenticated();

            if (authenticated || req.url === '/login') {
                next();
            } else if (!authenticated && req.url === '/') {
                res.redirect('/login');
            } else {
                res.sendFile(`${_root}/client/views/unauthorized.html`);
            }
        },
        getInstance: function () {
            return _passport;
        }
    };

    function _authorizationMiddleware(req, res, next) {
        _passport.authenticate('local', function (error, user, info) {
            if (error) {
                return next(err);
            } else if (!user) {
                return res.status(401).send('');
            }

            req.login(user, function (error) {
                if (error) {
                    return next(error);
                } else {
                    res.json({ id: user.id });
                }
            });
        })(req, res, next);
    }

    const _passport = require('passport'),
        _passportLocal = require('passport-local'),
        _User = require('../models/user');
    var _root = null;
} ());