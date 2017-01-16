/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)   
        .constant('_', _)
        .constant('vmuisettings', pph_config)
})();
