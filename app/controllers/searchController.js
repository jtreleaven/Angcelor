// AngularJS stub file

angcelor.controller('searchCtrl', ['$scope', 'CheckAPI',
    function($scope, CheckAPI) {

        $scope.getAllIP = function() {
            SubnetAPI.getList().then(function (subnets) {
                $scope.subnets = subnets;
                $scope.subnets.selected = true;
                IP_AddressAPI.one($scope.subnets.subnet_id).getList().then(function (ip_addrs) {
                    $scope.ip_addrs = ip_addrs;
                });
            });
        };
        $scope.getAllIP = function(searchText) {
            CheckAPI.getAllIP(searchText).getList.then(function (IPids){
                return IPids;
            });
        };
    }
]);