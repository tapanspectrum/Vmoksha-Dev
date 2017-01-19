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
        .module('app.company')
        .factory('CompanyService', CompanyService);
    /* @ngInject */
    function CompanyService($http, $location, $q, exception, logger, common, config, vmuisettings) {

        var readyPromise;

        var service = {
           
            getServices: getServices,
            getOverview: getOverview,
            getPage:getPage,
            ready: ready
        };

        return service;
       
       
        //Retrives the value from JSON file CustomerSpeak
       
        //Retrives the value from JSON file of  Slider2
        function getServices() {
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: 'pages/346'
 
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

          //Retrives the OverView value from JSON file aboutus
         
         
        function getOverview() {debugger
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl +'about_us.json'
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }


        function getPage(id) { debugger
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.BaseUrl + "pages/" + id

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