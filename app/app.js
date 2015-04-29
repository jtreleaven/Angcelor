'use strict';

// AngularJS stub file
var angcelor = angular.module("angcelor", [
    'ngRoute',
    'ngFileUpload',
    'ngResource',
    'restangular',
    'ui.layout',
    'ui.utils',
    'angular.filter'
]);

angcelor.config(function($routeProvider, RestangularProvider) {
    $routeProvider
        .when('/browse', {
        templateUrl: 'app/views/browse.html',
        controller: 'browseCtrl'
    })
        .otherwise({redirectTo: '/browse'});
    RestangularProvider.setBaseUrl('/api'); // Base URL for api server
    RestangularProvider.setDefaultHttpFields({
        useXDomain: true,
        withCredentials: true
    });

    // Setting Default requested type as JSON
    RestangularProvider.setDefaultHeaders({
        'common': {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
});

