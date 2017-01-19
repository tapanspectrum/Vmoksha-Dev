/* Description: The Clients Service page deals with maintaining functionality related to the Partners pages.
 * Author:  Kirti
 * Created On: 19/1/2017
 * Modified For: 
 * Modified On: 
 * Modified By:
 * */
(function() {
    'use strict';

    angular
        .module('app.clients')
        .factory('ClientsService', ClientsService);
    /* @ngInject */
    function ClientsService($http, $location, $q, exception, logger, common, config, vmuisettings) {

        var readyPromise;

        var service = {
           
            getClients:getClients,
            ready: ready
        };

        return service;
       
       
        //Retrives the value from JSON  data of the Clients

        function getClients() {debugger
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: vmuisettings.JsonDataUrl + 'clients.json'
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