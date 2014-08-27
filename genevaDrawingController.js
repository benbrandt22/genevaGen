(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('genevaDrawingController', function ($scope) {
        
        var s = $scope;

        s.viewBox = function () {
            // min x = left side of the genwva wheel, plus 10%
            var minx = (s.gWheel.x() - (1.1 * s.params.b));
            // min y = bottom of largest wheel radius, plus 10%
            var miny = (s.gWheel.y() - (1.1 * Math.max(s.params.a, s.params.b)));
            // width = distance between wheels, plus 110% of each radius
            var width = s.params.c + (1.1 * s.params.a) + (1.1 * s.params.b);
            // height = max diameter plus 10%
            var height = (Math.max(s.params.a, s.params.b) * 2) * 1.1;

            return (minx + ' ' + miny + ' ' + width + ' ' + height);
        };

        s.gWheel = {
            x: function () { return 0; },
            y: function () { return 0; },
            radius: function () { return s.params.b; },
            slotQty: function () { return s.params.n; },
            slotDepth: function () { return s.params.s; }
        };

        s.gDrive = {
            x: function () { return s.gWheel.x() + s.params.c; },
            y: function () { return s.gWheel.y(); },
            radius: function () { return s.params.a; }
        };

    });

})();