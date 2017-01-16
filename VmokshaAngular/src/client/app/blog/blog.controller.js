/* Description: The landing Controller deals with maintaining functionality related to the landing page.
 * Author:  Kirti
 * Created On: 29/12/2016
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */

(function () {
    'use strict';

    angular
        .module('app.blog')
        .controller('Blog',Blog);

         /* @ngInject */
    function Blog($state, $rootScope, $scope, store, vmuisettings, toastr, $log, $document, $timeout,BlogService) {
        var vm = this;
		//Function to scroll top
        vm.BackToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }  

 
  //*
        //Calling the function to get the Blog services Carousel Values  /
        //*

        function getBlog() {
            //calling service method to get all the Testimonial Carousel Values 
            return BlogService.getBlog({}).then(function (res) {
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
        getBlog();
}
        
 })();
