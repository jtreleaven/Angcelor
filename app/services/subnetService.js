/**
 * Created by jeff on 4/10/15.
 */

angcelor.factory('SubnetAPI', ['Restangular',
    function(Restangular) {
        return Restangular.service('subnets');
    }
]);
