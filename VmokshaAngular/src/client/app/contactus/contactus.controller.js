/* Description: The Demo Controller deals with maintaining functionality related to Demo maipulation by admin / super admin .
 * Author: Kirti
 * Created On: 
 * Modified For: 
 * Modified On: 
 * Modified By: 
 * */

(function () {
    'use strict';

    angular
        .module('app.contactus')
        .controller('Contactus', Contactus);


    /* @ngInject */
    function Contactus($state, logger, common, config, _, $sce, $rootScope, $scope, $timeout, $document, ContactusService, store, vmuisettings,  $log) {
        // Global Variable Declaration
        var vm = this;
       vm.IsContentLoaded = false;
        //________________________________________________________________________
        //Function to get the get data JSON Values
        //________________________________________________________________________
        

        vm.contactus = function () {debugger           
            //calling service method to reterive all privacy
            return ContactusService.contactus().then(function (res) {debugger              
                vm.contactus = res;
                 vm.IsContentLoaded = true;
            });
        }

        vm.contactus();
    }
})();
