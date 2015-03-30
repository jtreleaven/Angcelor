
angcelor.directive('tableSplitter', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $('#MySplitter').splitter({resizeToWidth:true});
        }
    };
});

