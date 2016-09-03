angular
    .module('socialNetwork.services')
    .factory('postService', function ($http, $resource) {
        'use strict';

        let Post = $resource('/api/post'),
            Comment = $resource('/api/comment');

        return {
            createPost: function (data, callback) {
                let comment = new Comment({
                    message: data.post,
                    likes: 0
                });

                comment.$save(function (res) {
                    let post = new Post({
                        body: res._id,
                        replies: [],
                        person: data.personId
                    });

                    post.$save(function (res) {
                        comment.post = res._id;
                        comment.$save();

                        if (callback && typeof callback === 'function') {
                            callback.call();
                        }
                    });
                });
            }
        }
    });