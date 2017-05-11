(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('genevaController', function ($scope) {
        
        $scope.primaryCalculationRadius = 'b';

        $scope.a_input;
        $scope.b_input = 3;
        $scope.n = 6;
        $scope.p = 0.25;
        $scope.t = 0.05;

        $scope.$watchCollection('[a_input, b_input, primaryCalculationRadius, n, p, t]', function () {
            // user changed a variable, update the drawing params
            $scope.drawingParams = {
                a: $scope.a(),
                b: $scope.b(),
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
        });

        $scope.animation = {
            enabled: false
        };

        $scope.a = function () {
            // drive crank radius
            if ($scope.primaryCalculationRadius == 'a') {
                return $scope.a_input;
            } else {
                var a = Math.pow((Math.pow($scope.c(), 2) - Math.pow($scope.b(), 2)), 0.5);
                return a;
            }
        };

        $scope.b = function () {
            // Geneva wheel radius
            if ($scope.primaryCalculationRadius == 'b') {
                return $scope.b_input;
            } else {
                var b = Math.pow((Math.pow($scope.c(), 2) - Math.pow($scope.a(), 2)), 0.5);
                return b;
            }
        };

        $scope.c = function () {
            // center distance
            if ($scope.primaryCalculationRadius == 'a') {
                return ($scope.a() / Math.sin(Math.PI / $scope.n));
            } else {
                return ($scope.b() / Math.cos(Math.PI / $scope.n));
            }
        };

        $scope.s = function () {
            // slot center length
            var s = (($scope.a() + $scope.b()) - $scope.c());
            return s;
        };

        $scope.w = function () {
            // slot width
            var w = ($scope.p + $scope.t);
            return w;
        };

        $scope.y = function () {
            // stop arc radius
            var y = $scope.a() - (1.5 * $scope.p);
            return y;
        };

        $scope.z = function () {
            // stop disc radius
            var z = ($scope.y() - $scope.t);
            return z;
        };

        $scope.v = function () {
            // clearance arc
            var v = ($scope.b() * $scope.z()) / $scope.a();
            return v;
        };
        


    });

})();