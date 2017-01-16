/* Description: The Demo Controller deals with maintaining functionality related to Demo maipulation by admin / super admin .
 * Author: Kirti
 * Created On: 27/12/2016
 * Modified For: 
 * Modified On: 
 * Modified By: 
 * */

(function () {
    'use strict';

    angular
        .module('app.demo')
        .controller('Demo', Demo);


    /* @ngInject */
    function Demo($state, logger, common, config, _, $sce, $rootScope, $scope, $timeout, $document, DemoService, store, vmuisettings,  $log) {
        // Global Variable Declaration
        var vm = this;
       vm.IsContentLoaded = false;
        //________________________________________________________________________
        //Function to get the get data JSON Values
        //________________________________________________________________________
        

        vm.getRecentPost = function () {debugger           
            //calling service method to reterive all privacy
            return DemoService.getRecentPost().then(function (res) {debugger              
                vm.demo = res;
                 vm.IsContentLoaded = true;
            });
        }

        vm.getRecentPost();
    }
})();
