
angcelor.controller('createCtrl', ['$scope', 'Subnet', function($scope, Subnet) {

    var tabs = ['subnet', 'ip', 'file'];

    $scope.selectedTab = 1;

    $scope.createSubnet = function(data) {
        var octets = data.mask.split('.');
        data.name = octets[2];
        data.net = octets[2];
        var subnet = Subnet.build(data);
    };
}])
