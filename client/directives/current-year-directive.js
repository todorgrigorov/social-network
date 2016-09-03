angular
    .module('socialNetwork.directives')
    .directive('currentYear', [function () {
        'use strict';

        return {
            link: function ($scope, $element) {
                $element.text(new Date().getFullYear());
            }
        };
    }]);