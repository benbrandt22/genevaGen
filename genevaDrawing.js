(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('genevaDrawing', function() {
        return {
            restrict: 'E',
            scope: {
                params: '='
            },
            controller: 'genevaDrawingController',
            link: function(scope, element, attrs) {
                
            },
            templateUrl: "genevaDrawingTmpl.htm"
        };
    })

})();