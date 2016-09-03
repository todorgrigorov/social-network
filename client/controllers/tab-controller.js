angular
    .module('socialNetwork.controllers')
    .controller('TabCtrl', function ($scope, $document, $resource, userService, postService) {
        'use strict';

        let dialog = $document[0].querySelector('dialog'),
            Person = $resource('/api/person'),
            Post = $resource('/api/post');

        $scope.showPostDialog = function () {
            if (!$scope.username) {
                userService.getUser(user => { $scope.username = user.username; });
            }
            dialog.showModal();
        };

        $scope.onDialogCancel = function () {
            $scope.post = null;
            dialog.close();
        };

        $scope.onDialogPost = function () {
            userService.getUser(user => {
                Person.query({ user: user._id }, res => {
                    postService.createPost({
                        post: $scope.post,
                        personId: res[0]._id
                    }, () => {
                        $scope.onDialogCancel();
                    });
                });
            });
        };
    });