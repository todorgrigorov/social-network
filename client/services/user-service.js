angular
    .module('socialNetwork.services')
    .factory('userService', function ($http) {
        'use strict';

        return {
            getUser: function (callback) {
                $http.get('/user').then(res => { callback(res.data); });
            }
        }
    });