(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('genevaDrawingController', ['$scope', '$interval', function ($scope, $interval) {
        
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
                    var pos = (i * (360 / this.slotQty()));
                    positionsInDegrees.push(pos);
                }
                return positionsInDegrees;
            },
            stopDiscCutout: {
                radius: function () { return s.params.y; },
                distanceFromCenter: function () { return s.params.c; }
            },
            rotationDegrees: function () {
                if (s.gDrive.pin.isWithinWheel()) {
                    // pin is within a wheel slot, calculate the wheel's position
                    var angleToPinRadians = Math.atan((s.gDrive.pin.y() - s.gWheel.y()) / (s.gDrive.pin.x() - s.gWheel.x()));
                    var angleToPinDegrees = (angleToPinRadians * (180 / Math.PI));
                    return angleToPinDegrees;
                } else {
                    // pin is outside wheel, revert to normal 'locked' position
                    return ((360 / this.slotQty()) / 2);
                }
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
                x: function () {
                    var x = s.gDrive.x() + (s.gDrive.pin.distance() * Math.cos(s.gDrive.pin.positionRadians()));
                    return x;
                },
                y: function () {
                    var y = s.gDrive.y() + (s.gDrive.pin.distance() * Math.sin(s.gDrive.pin.positionRadians()));
                    return y;
                },
                radius: function () { return (s.params.p / 2); },
                distance: function () { return s.params.a; },
                startPositionDegrees: function () {
                    var radians = (Math.PI - Math.atan(s.params.b / s.params.a));
                    var degrees = (radians * (180 / Math.PI));
                    var position = (-1 * degrees); // negative to go counter clockwise
                    return position;
                },
                positionRadians: function () {
                    var degrees = (s.gDrive.pin.startPositionDegrees() + s.gDrive.spinAngle);
                    var radians = (Math.PI / 180) * degrees;
                    return radians;
                },
                isWithinWheel: function () {
                    var distFromWheelCenter = pointDistance(s.gWheel.x(), s.gWheel.y(), s.gDrive.pin.x(), s.gDrive.pin.y());
                    return (distFromWheelCenter <= s.gWheel.radius());
                }
            },
            spinAngle: 0
        };

        var animationTimer;

        s.$watch('animation.enabled', function (animationEnabled) {
            if (animationEnabled) {
                animationTimer = $interval(function () {
                    s.gDrive.spinAngle = ((s.gDrive.spinAngle + 1) % 360);
                }, 20);
            } else {
                $interval.cancel(animationTimer);
            }
        });

        var pointDistance = function (x1, y1, x2, y2) {
            var xs = Math.pow(x2 - x1, 2);
            var ys = Math.pow(y2 - y1, 2);
            return Math.sqrt(xs + ys);
        };


    }]);

})();