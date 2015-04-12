
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
