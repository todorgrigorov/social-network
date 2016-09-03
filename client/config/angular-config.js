(function () {
    'use strict';

    angular
        .module('socialNetwork', ['ui.router', 'socialNetwork.controllers', 'socialNetwork.directives', 'socialNetwork.services'])
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            _configureRoutes($stateProvider);
            $urlRouterProvider.otherwise('/feed');
            $locationProvider.html5Mode(true);
        });

    angular
        .module('socialNetwork.controllers', ['ngResource']);
    angular
        .module('socialNetwork.directives', []);
    angular
        .module('socialNetwork.services', []);

    function _configureRoutes(provider) {
        provider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('tab', {
                url: '',
                templateUrl: 'views/tab.html',
                controller: 'TabCtrl',
                abstract: true
            })
            .state('tab.feed', {
                url: '/feed',
                templateUrl: 'views/feed.html',
                controller: 'FeedCtrl'
            })
            .state('tab.friends', {
                url: '/friends',
                templateUrl: 'views/friends.html',
                controller: 'FriendsCtrl'
            })
            .state('tab.me', {
                url: '/me',
                templateUrl: 'views/me.html',
                controller: 'MeCtrl'
            });
    }
} ());