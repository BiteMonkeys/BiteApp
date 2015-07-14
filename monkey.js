/**
 * Created by Aurimas on 2015-07-14.
 */
angular.module('biteMonkeyApp', ['ngMap'])
    .controller('MapsController', function ($scope, $timeout) {
        var mapsVm = $scope;
        mapsVm.detailsOpened = false;
        $scope.positions = [];

        mapsVm.stations = {
            zoomLevel: 8,
            list: [
                {
                    title: 'Vilnius station 1',
                    text: 'some text about station',
                    done: true,
                    location: {
                        latitude: 54.6957829,
                        longtitude: 25.2941403
                    }
                },
                {
                    title: 'Vilnius station 2',
                    text: 'some text about station',
                    done: true,
                    location: {
                        latitude: 54.6965079,
                        longtitude: 25.2969904
                    }
                },
                {
                    title: 'Kaunas station 1',
                    text: 'some text about station',
                    done: true,
                    location: {
                        latitude: 54.8700193,
                        longtitude: 24.4910278
                    }
                },
                {
                    title: 'Klaipëda station 1',
                    text: 'some text about station',
                    done: true,
                    location: {
                        latitude: 55.780192,
                        longtitude: 21.9168739
                    }
                },
                {
                    title: 'Vilkyèiø bokðtas',
                    text: 'some text about station',
                    done: true,
                    location: {
                        latitude: 55.5048628,
                        longtitude: 21.4190639
                    }
                }
            ]
        };

        $scope.$on('mapInitialized', function (event, map) {
            map.setCenter(new google.maps.LatLng(56, 24));

            for (var i=0; i<mapsVm.stations.list.length; i++) {
                var store = mapsVm.stations.list[i];
                store.position = new google.maps.LatLng(store.location.latitude,store.location.longtitude);
                store.title = store.title;

                $scope.positions.push({lat:store.location.latitude, lng: store.location.longtitude});

                var marker = new google.maps.Marker(store);

                google.maps.event.addListener(marker, 'click', function() {
                    mapsVm.openDetails(store);
                    console.log('marker clicked');
                });
                google.maps.event.addListener(map, 'click', function() {
                    closeDetails();
                });
            }

/*            $scope.markerClusterer = new MarkerClusterer(map, mapsVm.stations.list, {});*/
            $timeout(function () {
                google.maps.event.trigger(map, 'resize');
            });
        });

        $scope.showMarkers = function() {
            for (var key in $scope.map.markers) {
                $scope.map.markers[key].setMap($scope.map);
            };
        };

        $scope.openDetails = function (marker) {
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");

                console.log(marker);
            });
            mapsVm.detailsOpened = true;
            mapsVm.stationDetails = mapsVm.stations.list[0];
        }

        function closeDetails(){
            mapsVm.detailsOpened = false;
        }


    });