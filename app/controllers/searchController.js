// AngularJS stub file
var search = angular.module('search', []);

search.filter('dataFilter', function()
	{
		return function(ip_addrs, searchText){
			return ip_addrs.filter(function(ip_addr){
				var found = false;
				Object.keys(ip_addr).some(function(key){
					found = ip_addrs[key].search(regexp) > -1;
					return found;
				})
			})
		}
	}
);