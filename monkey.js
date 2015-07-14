/**
 * Created by Aurimas on 2015-07-14.
 */
angular.module('biteMonkeyApp', ['ngMap'])
    .controller('MapsController', function() {
        var mapsVm = this;
        mapsVm.stations = {
            zoomLevel: 15,
            list: [
                {
                    text:'some text about station',
                    done:true,
                    location: {
                        latitude : "",
                        longtitude : ""
                    }
                },
                {
                    text:'build an angular app',
                    done:false
                }
            ]
        };

    });