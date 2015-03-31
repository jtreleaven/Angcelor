
angcelor.directive('tableSplitter', function() {
    return {
        link: function(scope, element, attrs) {
            $(element).splitter({resizeToWidth: true});
        }
    };
});

