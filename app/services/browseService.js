// AngularJS stub file

angcelor.factory('Browse', ['$resource',
    function($resource) {
        return $resource('app/subnets/subnets.json', {}, {
            query: {method: 'GET', isArray: true}
        });
}]);


