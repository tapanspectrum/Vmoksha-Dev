/* Description: The landing Services deals with maintaining functionality related to the landing page.
 * Author:  Kirti
 * Created On: 29/12/2016
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */
(function() {
    'use strict';

    angular
        .module('app.landing')
        .factory('LandingService', LandingService);
    /* @ngInject */
    function LandingService($http, $location, $q, exception, logger, common, config, vmuisettings) {

        var readyPromise;

        var service = {
            getCustomerSpeakSlider: getCustomerSpeakSlider,
            getSlider2: getSlider2,
            getMainSlider: getMainSlider,
            getServices: getServices,
            getSlider3: getSlider3,
            ready: ready
        };

        return service;
       
       
        //Retrives the value from JSON file CustomerSpeak
        function getCustomerSpeakSlider() {
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl + 'customerspeak.json'

            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
        //Retrives the value from JSON file of  Slider2
        function getMainSlider() {
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl + 'mainslider.json'

            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
        //Retrives the value from JSON file of  Slider2
        function getServices() {
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl + 'services.json'

            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        //Retrives the value from JSON file of  Slider2
        function getSlider2() {
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl + 'slider2.json'

            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

          //Retrives the value from JSON file of  Slider3
        function getSlider3() {
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl + 'slider3.json'

            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }



     
        function ready(promisesArray) {
            return getReady()
                .then(function () {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                //logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;

        }
    }
})();