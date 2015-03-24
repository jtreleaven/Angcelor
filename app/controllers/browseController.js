// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'Subnet', function($scope, Subnet) {

    function initializeSubnets() {
        var subnets = Subnet.query();
        subnets[0]['selected'] = true;
        for (var i = 1; i < subnets.length; i++) {
            subnets[i]['selected'] = false;
        }

        return subnets;
    }

    function initializeIPAddresses(subnets) {
        var ip_addresses = [];
        for (subnet in subnets) {
            if (subnet['selected']) {
                ip_addresses.push(subnet.ip_addresses);
            }
        }

        return ip_addresses;
    }

    var subnets = initializeSubnets();
    var ip_addrs = initializeIPAddresses(subnets);

    $scope.subnets = subnets;
    $scope.ip_addrs = ip_addrs;

}]);
