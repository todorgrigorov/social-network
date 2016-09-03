angular
    .module('socialNetwork.controllers')
    .controller('LoginCtrl', function ($scope, $resource, $http, loginService) {
        'use strict';

        let User = $resource('/api/user'),
            Person = $resource('api/person');

        // User.query(function (res) {
        //     console.dir(res);
        //     res.forEach(function (element) {
        //         if (element.$delete) {
        //             element.$delete({
        //                 params: { id: element._id }
        //             });
        //         }
        //     }, this);
        // });

        loginService.logout();

        $scope.login = function () {
            loginService.login(new User({
                username: $scope.loginUsername,
                password: $scope.loginPassword
            }));
        };

        $scope.signUp = function () {
            let user = new User({
                username: $scope.username,
                password: $scope.password
            });

            user.$save(function (res) {
                let person = new Person({
                    email: $scope.email,
                    name: $scope.name,
                    user: res._id
                });

                person.$save(function () {
                    loginService.login(user);
                });
            });
        };
    });