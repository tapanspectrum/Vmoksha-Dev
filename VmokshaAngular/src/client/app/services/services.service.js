/* Description: The landing Services deals with maintaining functionality related to the landing page.
 * Author:  Kirti
 * Created On: 
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */
(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('ServicesService', ServicesService);
    /* @ngInject */
    function ServicesService($http, $location, $q, exception, logger, common, config, vmuisettings) {

        var readyPromise;

        var service = {
           
            getApplicationDevelopment: getApplicationDevelopment,
            ready: ready
        };

        return service;
       
       
        //Retrives the value from JSON file ApplicationDevelopment for all services page

        function getApplicationDevelopment() {debugger
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl +'application_development.json'
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