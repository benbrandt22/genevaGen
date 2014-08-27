(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('genevaDrawing', function() {
        return {
            restrict: 'E',
            scope: {
                params: '='
            },
            link: function(scope, element, attrs) {
                
                console.log('genevaDrawing LINK');
                console.log(scope);

            },
            templateUrl: "genevaDrawingTmpl.htm"
        };
    })

})();