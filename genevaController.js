(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('genevaController', function ($scope) {
        
        $scope.a = 1.75;
        $scope.b = 3;
        $scope.n = 6;
        $scope.p = 0.25;
        $scope.t = 0.05;

        $scope.c = function () {
            // center distance
            var c = ($scope.a / Math.sin(Math.PI / $scope.n));
            return c;
        };

        $scope.s = function () {
            // slot center length
            var s = (($scope.a + $scope.b) - $scope.c());
            return s;
        };

        $scope.w = function () {
            // slot width
            var w = ($scope.p + $scope.t);
            return w;
        };

        $scope.y = function () {
            // stop arc radius
            var y = $scope.a - (1.5 * $scope.p);
            return y;
        };

        $scope.z = function () {
            // stop disc radius
            var z = ($scope.y() - $scope.t);
            return z;
        };

        $scope.v = function () {
            // clearance arc
            var v = ($scope.b * $scope.z()) / $scope.a;
            return v;
        };

        $scope.drawingParams = function () {
            return {
                a: $scope.a,
                b: $scope.b,
                n: $scope.n,
                p: $scope.p,
                t: $scope.t,
                c: $scope.c(),
                s: $scope.s(),
                w: $scope.w(),
                y: $scope.y(),
                z: $scope.z(),
                v: $scope.v(),
            };
        };

    });

})();