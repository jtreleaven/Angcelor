// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'Browse', 'SubnetAPI', 'IP_AddressAPI',
    function($scope, Browse, SubnetAPI, IP_AddressAPI) {

        //function initializeSubnets() {
        //    var subnets = Browse.query();
        //    subnets.$promise.then(function(results) {
        //        results[0].selected = true;
        //        $scope.ip_addrs = results[0].ip_addresses;
        //        for (var i = 1; i < results.length; i++) {
        //            results[i].selected = false;
        //        }
        //        $scope.subnets = results;
        //    });
        //}

        function deselectSubnet() {
            for (var i = 0; i < $scope.subnets.length; i++) {
                $scope.subnets[i].selected = false;
            }
        }

        function updateIPAddrs() {
            var subnet = _.find($scope.subnets, function(subnet) {
                return subnet.selected;
            });
            IP_AddressAPI.one(subnet.subnet_id).getList().then(function(ip_addrs) {
                $scope.ip_addrs = ip_addrs;
            });
        }

        function real_initialize() {
            SubnetAPI.getList().then(function (subnets) {
                $scope.subnets = subnets;
                $scope.subnets[0].selected = true;
                IP_AddressAPI.one($scope.subnets[0].subnet_id).getList().then(function (ip_addrs) {
                    $scope.ip_addrs = ip_addrs;
                });
            });
        }

        real_initialize();

        $scope.changeSelectedSubnet = function(index) {
            deselectSubnet();
            $scope.subnets[index].selected = true;
            updateIPAddrs();
        };

        $scope.editSubnet = function(subnet) {
            console.log(subnet);
        };

        $scope.deleteSubnet = function(subnet_id) {
            SubnetAPI.one(subnet_id).remove().then(function(result){
                if (result.status == "failed") {
                    // display error and don't remove
                } else {
                    // Remove row and remove subnet instance from list
                    $scope.subnets = _.without($scope.subnets, _findWhere($scope.subnets, {subnet_id: subnet_id}));
                }
            });
        };
    }
]);
