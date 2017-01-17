/* Description: The services Controller deals with maintaining functionality related to the services pages.
 * Author:  Kirti
 * Created On: 16-01-2017
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */

(function () {
    'use strict';

    angular
        .module('app.services')
        .controller('Services',Services);

         /* @ngInject */
    function Services($state, $rootScope, $scope, store, vmuisettings, toastr, $log, $document, $timeout,ServicesService) {
        var vm = this;
		//Function to scroll top
        vm.BackToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }  

      
  
      //-----------------------------------------------------------//
      //* Function to get the Application Development  JSON Values 
      //-----------------------------------------------------------//
        vm.getApplicationDevelopment = function () {debugger          
          
            //calling service method to reterive all privacy
            return ServicesService.getApplicationDevelopment().then(function (res) {debugger  
            console.log(res);  
            var res;          
                vm.applicationdevelopment =res.ViewModels;
                // vm.ApplicationDevelopment[0].Description = "<p>" +  vm.ApplicationDevelopment[0].Description +"</p>"
                 vm.IsContentLoaded = true;
            });
        }

        vm.getApplicationDevelopment();
       
      
        
    }

 })();

        // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively 

        angular.module('app.services')
        .filter('nl2br', ['$sanitize', function($sanitize) {
          var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
          return function(msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg);
          };
        }]);
