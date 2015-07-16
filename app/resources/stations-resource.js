'use strict';

app.factory('stationsResource', ['$resource', function($resource) {
    return $resource('data/data.json', {}, {
            get: {
                method: 'GET', isArray: true
            }
        });
}]);