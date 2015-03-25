// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'Subnet', function($scope, Subnet) {

    function initializeSubnets() {
        var subnets = Subnet.query();
        subnets.$promise.then(function(results) {
            console.log(results);
            results[0].selected = true;
            for (var i = 1; i < results.length; i++) {
                results[i].selected = false;
            }
            $scope.subnets = results;
            initializeIPAddresses($scope.subnets);
        });
    }

    function initializeIPAddresses(subnets) {
        var ip_addresses = [];
        for (subnet in subnets) {
            if (subnet.selected) {
                ip_addresses.push(subnet.ip_addresses);
            }
        }

        $scope.ip_addrs = ip_addresses;
    }

    initializeSubnets();

}]);
