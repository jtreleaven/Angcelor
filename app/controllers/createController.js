
angcelor.controller('createCtrl', ['$scope', 'Subnet', 'ipAddress', 'SubnetAPI', 'IP_AddressAPI', 'CheckAPI',
    function($scope, Subnet, ipAddress, SubnetAPI, IP_AddressAPI, CheckAPI) {

        var tabs = ['subnet', 'ip', 'file'];

        $scope.selectedTab = 1;

        function createSubnet(data) {
            console.log("The createSubnet function has been called.");
            var octets = data.mask.split('.');
            var name = octets[2];
            var net = octets[2];
            CheckAPI.one("subnets").get().then(function(result) {
                var _id = result.available_id;
                console.log(_id);
                var subnet = new Subnet(_id, name, net, data.mask, data.description);
                SubnetAPI.post(subnet);
            });
        }

        function createIpAddress(data){
            var ip_addr = new ipAddress(data.address, data.subnet, data.address, data.monitored, data.description, data.deviceType);
            IP_AddressAPI.post(ip_addr);
        }

        $scope.submitAdd = function(data) {
            console.log("The submitAdd function has been called.");
            console.log("Current Selected Subnet: " + $scope.selectedTab);
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
    }
]);
