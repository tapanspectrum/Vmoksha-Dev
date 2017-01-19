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
        .module('app.landing')
        .controller('Landing',Landing);

         /* @ngInject */
    function Landing($state, $rootScope, $scope, store, vmuisettings, toastr, $log, $document, $timeout,LandingService,DemoService) {
        var vm = this;
		//Function to scroll top
        vm.BackToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }  

        //________________________________________________________________________
        //Function to get the get data JSON Values Demo URl
        //________________________________________________________________________
        

        vm.getRecentPost = function () {debugger           
            //calling service method to reterive all privacy
            return DemoService.getRecentPost().then(function (res) {debugger              
                vm.demo = res;
                 vm.IsContentLoaded = true;
            });
        }
 
  //*
        //Calling the function to get the Landing services Carousel Values  /
        //*

        function getServices() {
            //calling service method to get all the Testimonial Carousel Values 
            return LandingService.getServices({}).then(function (res) {
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
  //*
        //Calling the function to get the Main Slider Carousel Values  /
        //*
        function getMainSlider() {
            //calling service method to get all the Slider2 Carousel Values 
            return LandingService.getMainSlider({}).then(function (res) {
                if (res.Success) {
                    //Displaying 3 divs
                    vm.MainCarousel = res.ViewModels;
                    //Checkin for active class.
                    _.each(vm.MainCarousel, function (i, index) {
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
        getMainSlider();


        
        function getCustomerSpeakSlider() {
            //calling service method to get all the Testimonial Carousel Values 
            return LandingService.getCustomerSpeakSlider({}).then(function (res) {
                if (res.Success) {
                    //Displaying 3 divs
                    vm.Carousel = res.ViewModels;
                    //Checkin for active class.
                    _.each(vm.Carousel, function (i, index) {
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
        getCustomerSpeakSlider();

        function getSlider2() {
            //calling service method to get all the Slider2 Carousel Values 
            return LandingService.getSlider2({}).then(function (res) {
                if (res.Success) {
                    //Displaying 3 divs
                    vm.Carousel = res.ViewModels;
                    //Checkin for active class.
                    _.each(vm.Carousel, function (i, index) {
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
        getSlider2();


        function getSlider3() {
            //calling service method to get all the Slider3 Carousel Values 
            return LandingService.getSlider3({}).then(function (res) {
                if (res.Success) {
                    //Displaying 3 divs
                    vm.Carousel = res.ViewModels;
                    //Checkin for active class.
                    _.each(vm.Carousel, function (i, index) {
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
        getSlider3();
       
    }
  
 })();
