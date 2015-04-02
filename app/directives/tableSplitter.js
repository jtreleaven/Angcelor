
angcelor.directive('tableSplitter', function($document) {
    return {
        link: function(scope, element, attrs) {
            $(element).on('mousedown', function(e) {
                e.preventDefault();

                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(e) {
                var x = parseInt(e.pageX);

                $(element).css({
                    left: x + 'px'
                });

                $(attrs.splitterLeft).css({
                    width: x + 'px'
                });

                $(attrs.splitterRight).css({
                    left: (x + parseInt($attrs.splitterWidth)) + 'px'
                });
            }

            function mouseup(e) {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    };
});

