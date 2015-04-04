
angcelor.directive('showTab', function() {
    return {
        link: function ($scope, element, attrs) {
            element.click(function(e) {
                e.preventDefault();
                $(element).tab('show');
            });

            if (attrs['id'] == 'subnet') {
                $scope.selectedTab = 1;
            } else if (attrs['id'] == 'ip') {
                $scope.selectedTab = 2;
            } else {
                $scope.selectedTab = 3;
            }
        }
    };
});
