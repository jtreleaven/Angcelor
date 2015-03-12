// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'Subnet', function($scope, Subnet) {

    $scope.subnets = Subnet.query();

}]);
