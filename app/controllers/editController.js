/**
 * Created by jeff on 4/13/15.
 */

angcelor.controller('editCtrl', ['$scope', 'SubnetAPI',
    function($scope, SubnetAPI) {
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

        function submitIPChanges(ip_addr) {
            ip_addr.put().then(function(result) {
                if (result.status == 'failed') {
                    alert('Update for ip address failed!');
                    console.log(result);
                } else {
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

            $scope.subnetName = "";

            SubnetAPI.one(data.in_subnet).get().then(function(subnet) {

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
