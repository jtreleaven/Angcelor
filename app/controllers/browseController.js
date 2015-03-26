// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'Subnet', function($scope, Subnet) {

    function initializeSubnets() {
        var subnets = Subnet.query();
        subnets.$promise.then(function(results) {
            results[0].selected = true;
            $scope.ip_addrs = results[0].ip_addresses;
            for (var i = 1; i < results.length; i++) {
                results[i].selected = false;
            }
            $scope.subnets = results;
        });
    }

    function deselectSubnet() {
        for (var i = 0; i < $scope.subnets.length; i++) {
            $scope.subnets[i].selected = false;
        }
    }

    function updateIPAddrs() {
        var subnet = _.find($scope.subnets, function(subnet) {
            return subnet.selected;
        });
        $scope.ip_addrs = subnet.ip_addresses;
    }

    initializeSubnets();

    $scope.changeSelectedSubnet = function(index) {
        deselectSubnet();
        $scope.subnets[index].selected = true;
        updateIPAddrs();
    }

}]);
