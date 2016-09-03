angular
    .module('socialNetwork.services')
    .factory('loginService', function ($http, $location) {
        'use strict';

        return {
            login: function (user) {
                $http({
                    method: 'POST',
                    url: '/login',
                    data: user
                }).then(function (res) {
                    if (res.status !== 401) {
                        $location.url('/feed');
                    } else {
                        // todo: alert wrong credentials
                    }
                });
            },
            logout: function () {
                $http({
                    method: 'GET',
                    url: '/logout'
                });
            }
        }
    });