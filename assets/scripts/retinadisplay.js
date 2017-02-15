/**
 * jQuery-retinaDisplay
 * Dual licensed under MIT and GPL.
 * Date: 03/09/2012
 * @author Gabriel Bull
 * @version 0.2
 *
 * https://github.com/gavroche/jquery-retinadisplay
 */
(function ($) {

    var methods = {
        /* Init plugin */
        init: function (options) {
            return this.each(function () {
                var isRetina = (!!navigator.userAgent.match(/Macintosh|Mac|iPhone|iPad/i) && window.devicePixelRatio == 2);
                var retinaSrc = $(this).attr('data-retina-src');
                var exists = false;
                var obj = $(this);

                // Check if image is valid
                var loadImage = function (src, callback) {
                    var r = new XMLHttpRequest();
                    r.open("HEAD", src, true);
                    r.onreadystatechange = function () {
                        if (r.readyState == 4 && r.status === 200) {
                            exists = true;
                            callback.call();
                        }
                    };
                    r.send(null);
                };

                // Load image
                if (isRetina) {
                    loadImage(retinaSrc, function () {
                        if (exists) {
                            obj.attr('src', retinaSrc);
                        }
                    });
                }
            });
        }
    };

    $.fn.retinaDisplay = function (method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.retinaDisplay');
        }
    };

})(jQuery);
