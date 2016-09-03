angular
    .module('socialNetwork.controllers')
    .controller('LoginCtrl', function ($scope, $resource, $http, loginService) {
        var User = $resource('/api/user'),
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
            var user = new User({
                username: $scope.username,
                password: $scope.password
            });

            user.$save(function (res) {
                var person = new Person({
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