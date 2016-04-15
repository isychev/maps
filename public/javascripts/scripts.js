
angular.module("testMap", ["kendo.directives"])
        .controller("testMapCtrl", function ($scope) {
            console.log('was')
            $scope.mapOptions = {
                wraparound: false,
                center: [0, 0],
                zoom: 2,
                layers: [{
                        type: "tile",
                        urlTemplate: "/maps/#= zoom #/#= x #/#= y #",
                    }]
            };
        });