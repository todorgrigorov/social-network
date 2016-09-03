angular
    .module('socialNetwork.services')
    .factory('userService', function ($http) {
        return {
            getUser: function (callback) {
                $http({
                    method: 'GET',
                    url: '/user'
                }).then(function(res) {
                    callback(res.data);
                }); 
            }
        }
    });