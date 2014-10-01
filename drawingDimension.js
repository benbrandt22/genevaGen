(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('drawingDimension', function () {
        return {
            templateNamespace: 'svg', // REF: http://stackoverflow.com/a/24442531/641985
            restrict: 'E',
            replace: true,
            scope: {
                p1x: '=',
                p1y: '=',
                p2x: '=',
                p2y: '=',
                text: '=',
                leader: '=',
                lineWidth: '=',
                fontSize: '=',
            },
            link: function(scope, element, attrs) {
                
                var pointDistance = function (x1, y1, x2, y2) {
                    var xs = Math.pow(x2 - x1, 2);
                    var ys = Math.pow(y2 - y1, 2);
                    return Math.sqrt(xs + ys);
                };

                scope.$watchGroup(['p1x', 'p1y', 'p2x', 'p2y'], function () {
                    // points changed
                    scope.distanceBetween = pointDistance(scope.p1x, scope.p1y, scope.p2x, scope.p2y);
                    scope.angle = Math.atan2(scope.p2y - scope.p1y, scope.p2x - scope.p1x) * 180 / Math.PI;
                });

            },
            templateUrl: "drawingDimensionSvgTmpl.htm"
        };
    })

})();