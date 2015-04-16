/**
 * Created by jeff on 4/13/15.
 */

angcelor.controller('editCtrl', ['$scope',
    function($scope) {
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
                    $scope.updateComplete = true;
                }
            });
        }

        $scope.$on('ip', function(event, data) {
            $scope.editType = 'IP Address';
            $scope.data = data;
            $scope.showIP = true;
        });

        /**
         * This is called as a secondary call after the 'ip' event.
         */
        $scope.$on('create', function(event, data) {
            $scope.data.subnet = data;
        });

        /**
         * This handles the broadcast from the parent browseCtrl
         * when the edit button is select and passes the selected
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
            }
        };
    }
]);
