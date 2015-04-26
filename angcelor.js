'use strict';

// AngularJS stub file
var angcelor = angular.module("angcelor", [
    'ngRoute',
    'ngResource',
    'restangular',
    'ui.layout',
    'ui.utils',
    'angular.filter'
]);

angcelor.config(function($routeProvider, RestangularProvider) {
    $routeProvider
        .when('/browse', {
        templateUrl: 'app/views/browse.html',
        controller: 'browseCtrl'
    })
        .otherwise({redirectTo: '/browse'});
    RestangularProvider.setBaseUrl('/api'); // Base URL for api server
    RestangularProvider.setDefaultHttpFields({
        useXDomain: true,
        withCredentials: true
    });

    // Setting Default requested type as JSON
    RestangularProvider.setDefaultHeaders({
        'common': {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
});


// AngularJS stub file

angcelor.controller("browseCtrl", ['$scope', 'SubnetAPI', 'IP_AddressAPI',
    function($scope, SubnetAPI, IP_AddressAPI) {

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
            $scope.$broadcast('create', $scope.getSelectedSubnet());
        };

        $scope.editSubnet = function(subnet) {
            $scope.$broadcast('subnet', subnet);
        };

        $scope.cancelDelete = function() {
            $scope.itemToDelete = {};
        };

        $scope.setDelete = function(subnet) {
            $scope.itemToDelete = subnet;
            console.log($scope.itemToDelete);
            $scope.deleteType = 'subnet';
        };

        $scope.delete = function() {
            if ($scope.deleteType == 'subnet') {
                SubnetAPI.one($scope.itemToDelete.subnet_id).remove().then(function(result) {
                    if (result.status == "failed") {
                        // display error and didn't remove message
                    } else {
                        // Remove row and remove subnet instance from list
                        var subnet_id = $scope.itemToDelete.subnet_id;
                        $scope.subnets = _.without($scope.subnets, _.findWhere($scope.subnets, {subnet_id: subnet_id}));
                    }
                });
            }
        };
    }
]);


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
            var ip_addr = new ipAddress(data.address, data.subnet.subnet_id, data.address, data.monitored, data.description, data.deviceType);
            IP_AddressAPI.post(ip_addr).then(function(result) {
                if (result.status == 'failed') {
                    alert("Creation failed!");
                    $scope.actionComplete = true;
                } else {
                    $scope.data = {};
                    $scope.actionComplete = true;
                    $scope.actionSuccessful = true;
                    $scope.$parent.ip_addrs.push(ip_addr);
                }
            });
        }

        $scope.$on('create', function(event, data) {
            $scope.data.subnet = data;
        });

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

// AngularJS stub file

angcelor.controller('searchCtrl', ['$scope', 'CheckAPI',
    function($scope, CheckAPI) {

        $scope.getAllIP = function() {
            SubnetAPI.getList().then(function (subnets) {
                $scope.subnets = subnets;
                $scope.subnets.selected = true;
                IP_AddressAPI.one($scope.subnets.subnet_id).getList().then(function (ip_addrs) {
                    $scope.ip_addrs = ip_addrs;
                });
            });
        };
        $scope.getAllIP = function(searchText) {
            CheckAPI.getAllIP(searchText).getList.then(function (IPids){
                return IPids;
            });
        };
    }
]);

angcelor.directive('showTab', function() {
    return {
        link: function ($scope, element, attrs) {
            element.click(function(e) {
                e.preventDefault();
                if (attrs['id'] == 'subnet') {
                    $scope.selectedTab = 0;
                } else if (attrs['id'] == 'ip') {
                    $scope.selectedTab = 1;
                } else {
                    $scope.selectedTab = 2;
                }
                $(element).tab('show');
            });
        }
    };
});

angcelor.factory('ipAddress', function() {

    function ipAddress(name, in_subnet, address, monitored, description, deviceType) {
        this.name = name;
        this.in_subnet = in_subnet;
        this.address = address;
        this.monitored = monitored;
        this.description = description;
        this.deviceType= deviceType;

        return this;
    }

    return ipAddress;
});


angcelor.factory('Subnet', function() {

    function Subnet(subnet_id, name, net, mask, description) {
        this.subnet_id = subnet_id;
        this.name = name;
        this.net = net;
        this.mask = mask;
        this.description = description;
        return this;
    }

    return Subnet;
});

// AngularJS stub file

angcelor.factory('Browse', ['$resource',
    function($resource) {
        return $resource('app/subnets/subnets.json', {}, {
            query: {method: 'GET', isArray: true}
        });
}]);



/**
 * Created by jeff on 4/11/15.
 */

angcelor.factory('CheckAPI', ['Restangular',
    function(Restangular) {
        return Restangular.service('check');
    }
]);


/**
 * Created by jeff on 4/10/15.
 */

angcelor.factory('IP_AddressAPI', ['Restangular',
    function(Restangular) {
        return Restangular.service('ip');
    }
]);

// AngularJS stub file

/**
 * Created by jeff on 4/10/15.
 */

angcelor.factory('SubnetAPI', ['Restangular',
    function(Restangular) {
        return Restangular.service('subnets');
    }
]);
