
angcelor.directive('tableSplitter', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.splitter({resizeToWidth: true});
        }
    };
});

