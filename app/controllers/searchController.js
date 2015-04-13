// AngularJS stub file
var search = angular.module('search', []);

search.filter('dataFilter', function()
	{
		return function(ipAddress, searchText){
			return people.filter(function(person){
				var found = false;
				Object.keys(ipAddress).some(function(key){
					found = person[key].search(regexp) > -1;
					return found;
				})
			})
		}
	}
)