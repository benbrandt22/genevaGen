(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('genevaDrawingController', ['$scope', '$interval', function ($scope, $interval) {
        
        var s = $scope;

        s.$watchCollection('[params, drive.spinAngle]', function (newValues) {
            var params = newValues[0];

            var getPinStartPositionDegrees = function () {
                var radians = (Math.PI - Math.atan(params.b / params.a));
                var degrees = (radians * (180 / Math.PI));
                var position = (-1 * degrees); // negative to go counter clockwise
                return position;
            };

            var getPinPositionRadians = function () {
                var degrees = (getPinStartPositionDegrees() + getDriveSpinAngle());
                var radians = (Math.PI / 180) * degrees;
                return radians;
            };

            var getDriveSpinAngle = function () {
                if (s.drive && s.drive.spinAngle) {
                    return s.drive.spinAngle;
                } else {
                    return 0;
                }
            };

            s.drive = {
                x: (0 + params.c),
                y: 0,
                radius: (params.a + params.p),
                stopDisc: {
                    radius: params.z,
                    clearanceRadius: params.v
                },
                pin: {
                    x: (function () {
                        var x = (0 + params.c) + (params.a * Math.cos(getPinPositionRadians()));
                        return x;
                    })(),
                    y: (function () {
                        var y = 0 + (params.a * Math.sin(getPinPositionRadians()));
                        return y;
                    })(),
                    distance: params.a,
                    radius: (params.p / 2),
                    startPositionDegrees: getPinStartPositionDegrees(),
                    positionRadians: getPinPositionRadians(),
                    isWithinWheel: function () {
                        var distFromWheelCenter = pointDistance(s.wheel.x, s.wheel.y, s.drive.pin.x, s.drive.pin.y);
                        return (distFromWheelCenter <= s.wheel.radius);
                    }
                },
                spinAngle: getDriveSpinAngle()
            };

            s.wheel = {
                x: 0,
                y: 0,
                radius: params.b,
                slotQty: params.n,
                slotPositionsDegrees: (function () {
                    var positionsInDegrees = [];
                    for (var i = 0; i < params.n ; i++) {
                        var pos = (i * (360 / params.n));
                        positionsInDegrees.push(pos);
                    }
                    return positionsInDegrees;
                })(),
                slotDepth: params.s,
                slotWidth: params.w,
                stopDiscCutout: {
                    radius: params.y,
                    distanceFromCenter: params.c
                },
                rotationDegrees: function () {
                    if (s.drive.pin.isWithinWheel()) {
                        // pin is within a wheel slot, calculate the wheel's position
                        var angleToPinRadians = Math.atan((s.drive.pin.y - s.wheel.y) / (s.drive.pin.x - s.wheel.x));
                        var angleToPinDegrees = (angleToPinRadians * (180 / Math.PI));
                        return angleToPinDegrees;
                    } else {
                        // pin is outside wheel, revert to normal 'locked' position
                        return ((360 / s.wheel.slotQty) / 2);
                    }
                }
            };

            s.dims = {
                abcTriangle: {
                    p1: { x: s.wheel.x, y: s.wheel.y },
                    p2: { x: s.drive.x, y: s.drive.y },
                    p3: {
                        x: ( s.wheel.x + (s.wheel.radius * Math.cos((2 * Math.PI)/(2 * s.wheel.slotQty))) ),
                        y: ( s.wheel.y - (s.wheel.radius * Math.sin((2 * Math.PI) / (2 * s.wheel.slotQty))) )
                    }
                },
                vzTriangle: {
                    p1: { x: s.drive.x, y: s.drive.y },
                    p2: { x: (s.drive.x - s.drive.stopDisc.radius), y: s.drive.y },
                    p3: { x: (s.drive.x - s.drive.stopDisc.radius), y: (s.drive.y - s.drive.stopDisc.clearanceRadius) },
                }
            };

            s.viewBox = (function () {
                // min x = left side of the geneva wheel, plus 10%
                var minx = (s.wheel.x - (1.1 * params.b));
                // min y = bottom of largest wheel radius, plus 10%
                var miny = (s.wheel.y - (1.1 * Math.max(params.a, params.b)));
                // width = distance between wheels, plus 110% of each radius
                var width = params.c + (1.1 * (params.a + params.p)) + (1.1 * params.b);
                // height = max diameter plus 10%
                var height = (Math.max(params.a, params.b) * 2) * 1.1;

                return (minx + ' ' + miny + ' ' + width + ' ' + height);
            })();

        });


        var animationTimer;

        s.$watch('animation.enabled', function (animationEnabled) {
            if (animationEnabled) {
                animationTimer = $interval(function () {
                    s.drive.spinAngle = ((s.drive.spinAngle + 1) % 360);
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