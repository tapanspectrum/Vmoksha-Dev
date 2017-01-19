/* Description: The Clients Controller deals with maintaining functionality related to the Clients page.
 * Author:  Kirti
 * Created On: 19/1/2017
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */

(function () {
    'use strict';

    angular
        .module('app.clients')
        .controller('Clients',Clients);

         /* @ngInject */
    function Clients($state, $rootScope, $scope, store, vmuisettings, toastr, $log, $document, $timeout,ClientsService) {
        var vm = this;
		//Function to scroll top
        vm.BackToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }  

      
  
      //-----------------------------------------------------------//
      //* Function to get the Clients JSON Data
      //-----------------------------------------------------------//
        vm.getClients = function () {debugger          
          
            //calling service method to reterive all privacy
            return ClientsService.getClients().then(function (res) {debugger  
            console.log(res);  
            var res;          
                vm.clients =res.ViewModels;
                vm.clients[0].ImageURL_Companys =  vm.clients[0].ImageURL_Companys 
                 console.log( vm.clients[0].ImageURL_Companys);  
                 vm.IsContentLoaded = true;
            });
        }

        vm.getClients();
       
      
        
    }

 })();

        // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively 

        angular.module('app.clients')
        .filter('nl2br', ['$sanitize', function($sanitize) {
          var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
          return function(msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg);
          };
        }]);


        // angular.forEach(values, function(value, key){
        //   console.log(key + ': ' + value);
        //    });
