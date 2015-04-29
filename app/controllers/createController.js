
angcelor.controller('createCtrl', ['$scope', '$upload', 'Subnet', 'ipAddress', 'SubnetAPI', 'IP_AddressAPI', 'CheckAPI',
    function($scope, $upload, Subnet, ipAddress, SubnetAPI, IP_AddressAPI, CheckAPI) {

        var tabs = ['subnet', 'ip', 'file'];
        $scope.successMessage = "";
        $scope.data = {};
        $scope.selectedTab = 1;
        $scope.actionComplete = false;
        $scope.actionSuccessful = false;
        $scope.uploadInProgress = false;
        $scope.uploadProgress = 0;

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
                        $scope.successMessage = " Subnet Created Successfully!";
                        $scope.actionComplete = true;
                        $scope.actionSuccessful = true;
                        $scope.$parent.subnets.push(subnet);
                    }
                });
            });
        }

        function createIpAddress(data){
            console.log(data);
            var ip_addr = new ipAddress(data.name, data.in_subnet, data.ipv4_address, data.monitor, data.description, data.device_type);
            console.log(ip_addr);
            IP_AddressAPI.post(ip_addr).then(function(result) {
                if (result.status == 'failed') {
                    alert("Creation failed!");
                    $scope.actionComplete = true;
                } else {
                    $scope.data = {};
                    $scope.successMessage = " IP Address created successfully!";
                    $scope.actionComplete = true;
                    $scope.actionSuccessful = true;
                    $scope.$parent.ip_addrs.push(ip_addr);
                }
            });
        }

        $scope.$on('create', function(event, data) {
            $scope.subnetName = data.name;
            $scope.data.in_subnet = data.subnet_id;
        });

        $scope.submitAdd = function(data) {
            var tab = tabs[$scope.selectedTab];
            if (tab == 'subnet') {
                createSubnet(data);
            } else if (tab == 'ip') {
                createIpAddress(data);
            } else if (tab == 'file') {
                // file create stuff handled separately
            } else {
                // nothing here yet, maybe just using this for error reporting
            }
        };

        $scope.resetForms = function() {
            $scope.data = {};
            $scope.actionComplete = false;
            $scope.actionSuccessful = false;
        };


        $scope.onFileSelect = function(file) {
            $scope.uploadInProgress = true;
            $scope.upload = $upload.upload({
                url: '/api/file/upload',
                method: 'POST',
                file: file
            }).progress(function(event) {
                $scope.uploadProgress = parseInt(100.0 * event.loaded / event.total, 10);
            }).success(function(data, status, headers, config) {
                console.log(data);
                $scope.successMessage = " File uploaded successfully!";

                $scope.uploadInProgress = false;
                // If you need uploaded file immediately
                $scope.actionSuccessful = true;
                $scope.actionComplete = true;
            }).error(function(err) {
                console.log(err);
                $scope.uploadInProgress = false;
                $scope.actionComplete = true;
                console.log('Error uploading file: ' + err.message || err);
            });
        };

    }
]);
