// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'Restangular', function($scope, Restangular) {

    $scope.subnets = Restangular.all('Subnet/GetAllSubnets').getList();

}]);
