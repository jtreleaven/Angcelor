// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'SubnetAPI', 'IP_AddressAPI',
    function($scope, SubnetAPI, IP_AddressAPI) {

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

        $scope.getSelectedSubnet = function() {
            var subnet = _.find($scope.subnets, function(subnet) {
                return subnet.selected;
            });
            return subnet;
        };

        $scope.changeSelectedSubnet = function(index) {
            deselectSubnet();
            $scope.subnets[index].selected = true;
            updateIPAddrs();
        };

        $scope.broadcastCreate = function() {
            var subnet = $scope.getSelectedSubnet();
            $scope.$broadcast('create', subnet);
        };

        $scope.editIpAddress = function(ip_addr) {
            $scope.$broadcast('ip', ip_addr);
            $scope.$broadcast('create', $scope.getSelectedSubnet());
        };

        $scope.editSubnet = function(subnet) {
            $scope.$broadcast('subnet', subnet);
        };

        $scope.cancelDelete = function() {
            $scope.itemToDelete = {};
        };

        $scope.setDelete = function(subnet) {
            $scope.itemToDelete = subnet;
            console.log($scope.itemToDelete);
            $scope.deleteType = 'subnet';
        };

        $scope.delete = function() {
            if ($scope.deleteType == 'subnet') {
                SubnetAPI.one($scope.itemToDelete.subnet_id).remove().then(function(result) {
                    if (result.status == "failed") {
                        // display error and didn't remove message
                    } else {
                        // Remove row and remove subnet instance from list
                        var subnet_id = $scope.itemToDelete.subnet_id;
                        $scope.subnets = _.without($scope.subnets, _.findWhere($scope.subnets, {subnet_id: subnet_id}));
                    }
                });
            }
        };
    }
]);
