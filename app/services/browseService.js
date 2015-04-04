// AngularJS stub file

var browse = angular.module('BrowseServices', ['ngResource']);

browse.factory('Browse', ['$resource',
    function($resource) {
        return $resource('app/subnets/subnets.json', {}, {
            query: {method: 'GET', isArray: true}
        });
}]);
