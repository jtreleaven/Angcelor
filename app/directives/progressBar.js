/**
 * Created by jeff on 4/28/15.
 */

angcelor.directive('progressBar',
    function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.progressBar, function (newValue) {
                    element.css('width', newValue.toString() + '%');
                });
            }
        }
    }
);
