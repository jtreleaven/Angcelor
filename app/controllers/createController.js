
angcelor.controller('createCtrl', ['$scope', 'Subnet', 'ipAddress', 'SubnetAPI', 'IP_AddressAPI', 'CheckAPI',
    function($scope, Subnet, ipAddress, SubnetAPI, IP_AddressAPI, CheckAPI) {

        var tabs = ['subnet', 'ip', 'file'];
        $scope.data = {};
        $scope.selectedTab = 1;
        $scope.actionComplete = false;
        $scope.actionSuccessful = false;

        function createSubnet(data) {
            var octets = data.mask.split('.');
            var name = octets[2];
            var net = octets[2];
            CheckAPI.one("subnets").get().then(function(result) {
                var _id = result.available_id;
                var subnet = new Subnet(_id, name, net, data.mask, data.description);
                SubnetAPI.post(subnet).then(function(result) {
                    if (result.status == 'failed') {
                        alert("Creation failed!");
                        $scope.actionComplete = true;
                    } else {
                        $scope.data = {};
                        $scope.actionComplete = true;
                        $scope.actionSuccessful = true;
                        $scope.$parent.subnets.push(subnet);
                    }
                });
            });
        }

        function createIpAddress(data){
            var ip_addr = new ipAddress(data.address, data.subnet, data.address, data.monitored, data.description, data.deviceType);
            IP_AddressAPI.post(ip_addr);
        }

        $scope.submitAdd = function(data) {
            var tab = tabs[$scope.selectedTab];
            if (tab == 'subnet') {
                createSubnet(data);
            } else if (tab == 'ip') {
                createIpAddress(data);
            } else if (tab == 'file') {
                // file create stuff
            } else {
                // nothing here yet, maybe just using this for error reporting
            }
        };

        $scope.resetForms = function() {
            $scope.data = {};
            $scope.actionComplete = false;
            $scope.actionSuccessful = false;
        }
    }
]);
