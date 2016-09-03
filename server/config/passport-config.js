(function () {
    var passport = require('passport'),
        passportLocal = require('passport-local'),
        User = require('../models/user');

    module.exports = {
        init: function (expressApp, root) {
            _root = root;
            expressApp.use(passport.initialize());
            expressApp.use(passport.session());
            expressApp.post('/login', _authorizationMiddleware);
            expressApp.get('/logout', function (req, res) {
                req.logout();
                res.status(200).send('');
            });
            expressApp.get('/user', function(req, res) {
                res.json(req.user);
            });

            passport.serializeUser(function (user, done) {
                done(null, user.id);
            });

            passport.deserializeUser(function (id, done) {
                User.findById(id, function (error, user) {
                    done(error, user);
                });
            });

            passport.use(new passportLocal.Strategy(
                function (username, password, done) {
                    User.findOne({ username: username }, function (error, user) {
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
            if (req.isAuthenticated() || req.url === '/login') {
                next();
            } else {
                res.sendFile(_root + '/client/views/unauthorized.html');
            }
        },
        getInstance: function () {
            return passport;
        }
    };

    function _authorizationMiddleware(req, res, next) {
        passport.authenticate('local', function (error, user, info) {
            if (error) {
                return next(err);
            } else if (!user) {
                return res.status(401).send('');
            }

            req.login(user, function (error) {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send('');
                }
            });
        })(req, res, next);
    }

    var _root = null;
} ());