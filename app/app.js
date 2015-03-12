'use strict';

// AngularJS stub file
var angcelor = angular.module("angcelor", [
    'ngRoute',
    'restangular',
    'BrowseServices'
]);

angcelor.config(function($routeProvider, RestangularProvider) {
    $routeProvider
        .when('/browse', {
        templateUrl: 'app/views/browse.html',
        controller: 'browseCtrl'
    })
        .otherwise({redirectTo: '/browse'});
    RestangularProvider.setBaseUrl('http://localhost:8080/'); // Base URL for development
    RestangularProvider.setDefaultHttpFields({
        useXDomain: true,
        withCredentials: true
    });
    RestangularProvider.setDefaultHeaders({
        'common': {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
});

