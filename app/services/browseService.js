// AngularJS stub file

var browse = angular.module('BrowseServices', ['ngResource']);

browse.factory('Subnet', ['$resource',
    function($resource) {
        return $resource('app/subnets/subnets.json', {}, {
            query: {method: 'GET', isArray: true}
        });
}]);
