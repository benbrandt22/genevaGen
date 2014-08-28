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
            slotDepth: function () { return s.params.s; },
            slotWidth: function () { return s.params.w; },
            slotPositions: function () {
                var positionsInDegrees = [];
                for (var i = 0; i < this.slotQty(); i++) {
                    var pos = (i + 0.5) * (360 / this.slotQty())
                    positionsInDegrees.push(pos);
                }
                return positionsInDegrees;
            },
            stopDiscCutout: {
                radius: function () { return s.params.y; },
                distanceFromCenter: function () { return s.params.c; }
            }
        };

        s.gDrive = {
            x: function () { return s.gWheel.x() + s.params.c; },
            y: function () { return s.gWheel.y(); },
            radius: function () { return s.params.a; },
            stopDisc: {
                radius: function () { return s.params.z; },
                clearanceRadius: function () { return s.params.v; }
            },
            pin: {
                radius: function () { return (s.params.p / 2); },
                distance: function () { return s.params.a; },
                startPositionDegrees: function () {
                    var radians = (Math.PI - Math.atan(s.params.b / s.params.a));
                    var degrees = (radians * (180 / Math.PI));
                    var position = (-1 * degrees); // negative to go counter clockwise
                    return position;
                }
            }
        };

    });

})();