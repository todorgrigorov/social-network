angular
    .module('socialNetwork.controllers')
    .controller('TabCtrl', function ($scope, $document, $resource, userService) {
        var dialog = $document[0].querySelector('dialog'),
            Person = $resource('/api/person'),
            Post = $resource('/api/post');

        $scope.showPostDialog = function () {
            if (!$scope.username) {
                userService.getUser(function (user) {
                    $scope.username = user.username;
                });
            }
            dialog.showModal();
        };

        $scope.onDialogCancel = function () {
            $scope.post = null;
            dialog.close();
        };

        $scope.onDialogPost = function () {
            userService.getUser(function (user) {
                Person.query(function(res) {
                    
                });
                
                var post = new Post({
                    body: {
                        message: $scope.post,
                        likes: 0
                    },
                    replies: [],
                    person: user.person.id
                });
                
                post.$save(function() {

                });
            });
        };
    });