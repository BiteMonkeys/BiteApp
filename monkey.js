/**
 * Created by Aurimas on 2015-07-14.
 */
angular.module('biteMonkeyApp', ['ngMap'])
    .controller('MapsController', function($scope, $timeout) {
        var mapsVm = $scope;
        mapsVm.detailsOpened = false;



        $scope.$on('mapInitialized', function(event, map) {
                map.setCenter(new google.maps.LatLng(56,24));
            $timeout(function(){
                google.maps.event.trigger(map,'resize');
            });
        });

        mapsVm.openDetails = function(event){
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });

            mapsVm.detailsOpened = !mapsVm.detailsOpened;
            mapsVm.stationDetails = mapsVm.stations.list[0];
        }

        mapsVm.stations = {
            zoomLevel: 8,
            list: [
                {
                    title: 'Vilnius station 1',
                    text:'some text about station',
                    done:true,
                    location: {
                        latitude : 54.6957829,
                        longtitude : 25.2941403
                    }
                },
                {
                    title: 'Vilnius station 2',
                    text:'some text about station',
                    done:true,
                    location: {
                        latitude : 54.6965079,
                        longtitude : 25.2969904
                    }
                },
                {
                    title: 'Kaunas station 1',
                    text:'some text about station',
                    done:true,
                    location: {
                        latitude : 54.8700193,
                        longtitude : 24.4910278
                    }
                },
                {
                    title: 'Klaipëda station 1',
                    text:'some text about station',
                    done:true,
                    location: {
                        latitude : 55.780192,
                        longtitude : 21.9168739
                    }
                },
                {
                    title: 'Vilkyèiø bokðtas',
                    text:'some text about station',
                    done:true,
                    location: {
                        latitude : 55.5048628,
                        longtitude : 21.4190639
                    }
                }
            ]
        };

    });