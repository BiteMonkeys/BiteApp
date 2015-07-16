'use strict';

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

    $urlRouterProvider.otherwise(function ($injector) {
        $injector.invoke([
            'spaRouteService', function (spaRouteService) {
                spaRouteService.route({ defaultPath: '/' });
            }
        ]);
    });
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        if (path != '/' && path.slice(-1) === '/') {
            $location.replace().path(path.slice(0, -1));
        }
    });

    $stateProvider
        .state('maps', {
            url: '/'
        });
}]);