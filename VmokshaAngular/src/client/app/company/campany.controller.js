/* Description: The Company Controller deals with maintaining functionality related to the Company pages.
 * Author:  Kirti
 * Created On: 29/12/2016
 * Modified For:Function to get the Overview  JSON Values,ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively 
 * Modified On: 7/1/2016,13/1/2016
 * Modified By:Kirti
 * */

(function () {
    'use strict';

    angular
        .module('app.company')
        .controller('Company',Company);

         /* @ngInject */
    function Company($state, $rootScope, $scope, store, vmuisettings, toastr, $log, $document, $timeout,CompanyService) {
        var vm = this;
		//Function to scroll top
        vm.BackToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }  

      
  //*
        //Calling the function to get the Landing services Carousel Values  /
        //*

        function getServices() {
            //calling service method to get all the Testimonial Carousel Values 
            return CompanyService.getServices({}).then(function (res) {
                if (res.Success) {
                    //Displaying 3 divs
                    vm.Services = res.ViewModels;
                    //Checkin for active class.
                    _.each(vm.Services, function (i, index) {
                        if (index == 0) {
                            i.class = "active";
                        }
                        else {
                            i.class = "";
                        }
                        i.SlideNumber = index;
                        i.TrimDescription = (i.Description).trim();
                    });
                }
                else {
                }
            });
        }
        getServices();
      
      //-----------------------------------------------------------//
      //* Function to get the Overview  JSON Values 
      //-----------------------------------------------------------//
        vm.getOverview = function () {debugger          
          
            //calling service method to reterive all privacy
            return CompanyService.getOverview().then(function (res) {debugger  
            console.log(res);  
            var res;          
                vm.overview =res.ViewModels;
                vm.overview[0].Description = "<p>" +  vm.overview[0].Description +"</p>"
                 vm.IsContentLoaded = true;
            });
        }

        vm.getOverview();
        

      
      //-----------------------------------------------------------//
      //* Function to get the get page data JSON Values  page 346
      //-----------------------------------------------------------//
          vm.getPage = function () {debugger          
          var id = 346; 
            //calling service method to reterive all privacy
            return CompanyService.getPage(id).then(function (res) {debugger  
           // console.log(res);            
                vm.page346 = res;
                 vm.IsContentLoaded = true;
            });
        }

        vm.getPage();
        
    }

 })();

        // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively 

        angular.module('app.company')
        .filter('nl2br', ['$sanitize', function($sanitize) {
          var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
          return function(msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg);
          };
        }]);
