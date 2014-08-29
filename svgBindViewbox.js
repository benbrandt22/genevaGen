(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('svgBindViewbox', function () {
        return {
            link: function (scope, element, attrs) {
                /*
                inserts the evaluated value of the "svg-bind-viewbox" attribute
                into the "viewBox" attribute, making sure to capitalize the "B",
                as this SVG attribute name is case-sensitive.
                */
                attrs.$observe('svgBindViewbox', function (value) {
                    element.attr('viewBox', value);
                })
            }
        };
    });

})();