'use strict';

app.controller('MapsController', ['$rootScope', "$scope", '$state', 'stationsResource',
    function ($rootScope, $scope, $state, stationsResource) {
		$rootScope.detailsOpened = false;
        $rootScope.positions = [];
        $rootScope.stationDetails = {};
	
	
        stationsResource.get({}, function (success) {
            $rootScope.stations = success;
        });
		
		$rootScope.$on('mapInitialized', function (event, map) {
            map.setCenter(new google.maps.LatLng(56, 24));

            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });


            for (var i = 0; i < $rootScope.stations.list.length; i++) {
                var store = $rootScope.stations.list[i];
                store.position = new google.maps.LatLng(store.location.latitude, store.location.longitude);

                mapsVm.positions.push({lat: store.location.latitude, lng: store.location.longitude});

                var marker = new google.maps.Marker({
                    position: store.position,
                    map: map,
                    title: store.title,
                    station: store
                });

                attachEventToMarker(marker, map);

            }

            google.maps.event.addListener(map, 'click', function () {
                closeDetails();
            });
        });

		$rootScope.openDetails = function (marker) {
            console.log(marker);

            //$("#wrapper").removeClass("toggled");

            $rootScope.detailsOpened = true;

            $rootScope.$apply(function () {
                $rootScope.stationDetails = marker.station;
            });
        }


        function closeDetails() {
            //$("#wrapper").addClass("toggled");
            $rootScope.detailsOpened = false;
        }

        function attachEventToMarker(marker, map){

            google.maps.event.addListener(marker, 'click', function () {
                $rootScope.openDetails(marker);

                $rootScope.$apply(function () {
                    $rootScope.stationDetails = marker.station;
                });
				
                map.panTo(marker.getPosition());
                map.setZoom(12);
            });

        }

        $rootScope.showNetwork = function(input) {
            return input == '3G' ? "<span class='badge'"+input+"</span>" : "<span class='badge badge-success'>"+input+"</span>";
        };
    }]);