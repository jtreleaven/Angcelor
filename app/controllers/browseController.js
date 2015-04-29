// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'SubnetAPI', 'IP_AddressAPI',
    function($scope, SubnetAPI, IP_AddressAPI) {

        $scope.subnet_reverse = false;
        $scope.ip_reverse = false;
        $scope.subnet_predicate = "name";
        $scope.ip_predicate = "ipv4_address";

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

        function searchAllIPAddress(text)
        {
            var str = IP_AddressAPI.searchAllIP(text).getList();
            console.log('%s', str[0]);
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
        };

        $scope.editSubnet = function(subnet) {
            console.log(subnet);
            $scope.$broadcast('subnet', subnet);
        };

        $scope.deleteItem = function(item, type) {
            $scope.item = item;
            $scope.type = type;
        };

        $scope.cancelDelete = function() {
            $scope.item = null;
            $scope.type = '';
        };

        $scope.delete = function(item, type) {
            if (type === 'subnet') {
                SubnetAPI.one(item.subnet_id).remove().then(function(result) {
                    if (result.status === 'failed') {
                        console.error(result);
                    }
                    var subnet_id = item.subnet_id;
                    $scope.subnets = _.without($scope.subnets, _.findWhere($scope.subnets, {subnet_id: subnet_id}));

                }, function(error) {
                    console.error(error);
                });
            } else {
                IP_AddressAPI.one(item.ipv4_address).remove().then(function(result) {
                    if (result.status == 'failed') {
                        console.error(result);
                    }
                    var ipv4 = item.ipv4_address;
                    $scope.ip_addrs = _.without($scope.ip_addrs, _.findWhere($scope.ip_addrs, {ipv4_address: ipv4}));
                }, function(error) {
                    console.error(error);
                });
            }
        };
    }
]);
