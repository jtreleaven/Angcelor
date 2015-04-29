/**
 * Created by jeff on 4/13/15.
 */

angcelor.controller('editCtrl', ['$scope', 'ipAddress', 'SubnetAPI', 'IP_AddressAPI',
    function($scope, ipAddress, SubnetAPI, IP_AddressAPI) {
        $scope.data = {};
        $scope.showSubnet = false;
        $scope.showIP = false;
        $scope.editType = '';
        $scope.updateComplete = false;

        function submitSubnetChanges(subnet) {
            subnet.put().then(function(result) {
                if (result.status == 'failed') {
                    alert('Update for subnet failed!');
                    console.log(result);
                } else {
                    $scope.successMessage = "Subnet updated successfully!";
                    $scope.updateComplete = true;
                }
            });
        }

        /**
         * Currently this will have to be done with a post
         * action to the server due to the ipv4 address being
         * the primary key for the ip_address table.
         * @param data - This is the ip_address model from
         *                  the form submission.
         */
        function submitIPChanges(data) {
            var ip_addr = new ipAddress(data.name, data.in_subnet, data.ipv4_address, data.monitor, data.description, data.device_type);
            IP_AddressAPI.post(ip_addr).then(function(result) {
                if (result.status == 'failed') {
                    alert('Update for IP Address failed!');
                    console.error(result);
                } else {
                    $scope.successMessage = "IP Address updated successfully!";
                    $scope.updateComplete = true;
                }
            });
        }

        /**
         * This handles the broadcast from the parent browseCtrl
         * when the edit ip button is selected and passes the
         * ip address data.
         */
        $scope.$on('ip', function(event, data) {
            $scope.editType = 'IP Address';

            console.log(data);

            SubnetAPI.one(data.in_subnet).get().then(function(subnet) {
                $scope.subnetName = subnet.name;
            });
            $scope.data = data;
            $scope.showIP = true;
        });

        /**
         * This handles the broadcast from the parent browseCtrl
         * when the edit subnet button is selected and passes the
         * subnets data.
         */
        $scope.$on('subnet', function(event, data) {
            $scope.editType = 'Subnet';
            $scope.data = data;
            $scope.showSubnet = true;
        });

        $scope.cancelChanges = function() {
            $scope.data = {};
            $scope.showSubnet = false;
            $scope.showIP = false;
            $scope.editType = '';
            $scope.updateComplete = false;
        };

        $scope.submitChanges = function(data) {
            if ($scope.editType == 'Subnet') {
                submitSubnetChanges(data);
            } else if ($scope.editType == 'IP Address') {
                submitIPChanges(data);
            }
        };
    }
]);
