/**
 * Created by jeff on 4/10/15.
 */

angcelor.factory('IP_AddressAPI', ['Restangular',
    function(Restangular) {
        return Restangular.service('ip');
    }
]);
