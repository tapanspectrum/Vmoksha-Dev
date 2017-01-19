/* Description: The Partners Controller deals with maintaining functionality related to the Partners pages.
 * Author:  Kirti
 * Created On: 19/1/2017
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */

(function () {
    'use strict';

    angular
        .module('app.partners')
        .controller('Partners',Partners);

         /* @ngInject */
    function Partners($state, $rootScope, $scope, store, vmuisettings, toastr, $log, $document, $timeout,PartnersService) {
        var vm = this;
		//Function to scroll top
        vm.BackToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }  

      
  
      //-----------------------------------------------------------//
      //* Function to get the Partners JSON Data
      //-----------------------------------------------------------//
        vm.getPartners = function () {debugger          
          
            //calling service method to reterive all privacy
            return PartnersService.getPartners().then(function (res) {debugger  
            console.log(res);  
            var res;          
                vm.partners =res.ViewModels;
                 vm.IsContentLoaded = true;
            });
        }

        vm.getPartners();
       
      
        
    }

 })();

        // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively 

        angular.module('app.partners')
        .filter('nl2br', ['$sanitize', function($sanitize) {
          var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
          return function(msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg);
          };
        }]);
