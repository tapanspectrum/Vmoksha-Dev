/* Description: The Shell Controller deals with maintaining functionality related to assigning template urls.
 * Author:  Kirti
 * Created On: 26/12/2016
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);
    /* @ngInject */
    function Shell($state, $rootScope, $scope, store, vmuisettings, toastr, $log, $document, $timeout) {
        var vm = this;
		//Function to scroll top
        vm.BackToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }        
    }
})();
