'use strict';

app.controller('MapsController', ['$rootScope', "$scope", '$state', 'stationsResource', '$timeout',
    function ($rootScope, $scope, $state, stationsResource, $timeout) {
		$rootScope.detailsOpened = false;
        $rootScope.positions = [];
        $rootScope.stationDetails = {};
        $rootScope.markers = [];
        $rootScope.map = {};
        $rootScope.lithuniaLocation = {};
	
        stationsResource.get({}, function (success) {
            $rootScope.stations = success;
        });
		
		$rootScope.$on('mapInitialized', function (event, map) {

            var geocoder = new google.maps.Geocoder();
            // Get LatLng information by name
            geocoder.geocode({ "address": "Lithuania" }, function(results, status){
                $rootScope.lithuniaLocation = results[0].geometry.location;
                map.setCenter($rootScope.lithuniaLocation);
            });

            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });

            angular.forEach($rootScope.stations, function(station){
                station.position = new google.maps.LatLng(station.location.latitude, station.location.longitude);

                $rootScope.positions.push({lat: station.location.latitude, lng: station.location.longitude});

                var marker = new google.maps.Marker({
                    position: station.position,
                    map: map,
                    title: station.title,
                    station: station
                });

                attachEventToMarker(marker, map);
                $rootScope.markers.push(marker);
            });

            google.maps.event.addListener(map, 'click', function () {
                closeDetails(map);
            });

            $rootScope.map = map;
        });

		$rootScope.openDetails = function (marker) {
            $("#wrapper").removeClass("toggled");

            $rootScope.detailsOpened = true;

            $scope.$apply(function () {
                $rootScope.stationDetails = marker.station;
            });
        }


        function closeDetails(map) {
            $("#wrapper").addClass("toggled");
            $rootScope.detailsOpened = false;
            map.setZoom(8);
            $timeout(function() {
                map.setCenter($rootScope.lithuniaLocation);
            }, 400);
        }

        function attachEventToMarker(marker, map){

            google.maps.event.addListener(marker, 'click', function () {
                $rootScope.openDetails(marker);

                $rootScope.stationDetails = marker.station;
                $timeout(function() {
                    map.panTo(marker.getPosition());
                    map.setZoom(12);
                    google.maps.event.trigger(map, "resize");
                }, 100);
            });

        }

        $rootScope.search  = function (item) {
            var markerSelected;
            angular.forEach($rootScope.markers, function(marker){
                if(marker.station.name === item.name){
                    markerSelected = marker;
                }
            });

            if(markerSelected) {
                $timeout(function() {
                    google.maps.event.trigger(markerSelected, 'click');
                }, 1000);
            }
        };

        $rootScope.showNetwork = function(input) {
            return input == '3G' ? "<span class='badge'>"+input+"</span>" : "<span class='badge badge-success'>"+input+"</span>";
        };
    }]);