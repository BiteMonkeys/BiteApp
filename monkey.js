angular.module('biteMonkeyApp', ['ngMap'])
    .controller('MapsController', function ($scope, $timeout) {
        var mapsVm = this;
        mapsVm.detailsOpened = false;
        mapsVm.positions = [];
        mapsVm.stationDetails = {};

        mapsVm.stations = {
            zoomLevel: 8,
            list: dataJS
        };

        $scope.$on('mapInitialized', function (event, map) {
            map.setCenter(new google.maps.LatLng(56, 24));



            //google.maps.event.addDomListener(window, 'resize', function() {
            //    map.setCenter(center);
            //});

            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });


            for (var i = 0; i < mapsVm.stations.list.length; i++) {
                var store = mapsVm.stations.list[i];
                store.position = new google.maps.LatLng(store.location.latitude, store.location.longitude);
                //store.title = store.title;

                mapsVm.positions.push({lat: store.location.latitude, lng: store.location.longitude});

                //var marker = new google.maps.Marker(store);

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


            /*            $scope.markerClusterer = new MarkerClusterer(map, mapsVm.stations.list, {});*/
            $timeout(function () {
                google.maps.event.trigger(map, 'resize');
            });
        });

        //$scope.showMarkers = function() {
        //    for (var key in $scope.map.markers) {
        //        $scope.map.markers[key].setMap($scope.map);
        //    };
        //};

        mapsVm.openDetails = function (marker) {
            console.log(marker);

            $("#wrapper").removeClass("toggled");

            //$("#station-info #station-title").text(marker.station.title);
            //$("#station-info #station-description").text(marker.station.text);



            mapsVm.detailsOpened = true;

            $scope.$apply(function () {
                mapsVm.stationDetails = marker.station;
            });
        }


        function closeDetails() {
            $("#wrapper").addClass("toggled");
            mapsVm.detailsOpened = false;
        }

        function attachEventToMarker(marker, map){

            google.maps.event.addListener(marker, 'click', function () {
                mapsVm.openDetails(marker);
                // kas á centra varytu  || tik ið antro karto :(
                //var center = map.getCenter();
                //google.maps.event.trigger(map, "resize");
                //map.setCenter(center);
                $scope.$apply(function () {
                    mapsVm.stationDetails = marker.station;
                });
                map.panTo(marker.getPosition());
                map.setZoom(12);

            });
        }

    });