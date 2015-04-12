/**
 * Created by jeff on 4/11/15.
 */

angcelor.factory('CheckAPI', ['Restangular',
    function(Restangular) {
        return Restangular.service('check');
    }
]);

