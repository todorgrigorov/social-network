angular
    .module('socialNetwork.directives')
    .directive('currentYear', [function () {
        return {
            link: function ($scope, $element) {
                $element.text(new Date().getFullYear());
            }
        };
    }]);