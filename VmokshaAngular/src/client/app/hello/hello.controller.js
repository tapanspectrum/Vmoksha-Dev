

(function () {
    'use strict';

    angular
        .module('app.hello')
        .controller('Hello', Hello);

    /* @ngInject */
    function Hello($state, logger, common, config, _, $sce, $rootScope, $scope, $timeout, $document, HelloService, store, vmuisettings,  $log) {
        // Global Variable Declaration
        var vm = this;
      
        //________________________________________________________________________
        //Function to get the get data JSON Values
        //________________________________________________________________________
        

    
        vm.getRecentPost = function () {debugger           
            //calling service method to reterive all privacy
            return HelloService.getRecentPost().then(function (res) {debugger              
                vm.hello= res;
            
            });
        }

        vm.getRecentPost();
    }
})();
