/* Description: The Demo Service deals with maintaining api calls .
 * Author:  Kirti V.
 * Created On: 
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';

    angular
        .module('app.contactus')
        .factory('ContactusService', ContactusService);
    /* @ngInject */
    function ContactusService($http, $location, $q, exception, logger, common, config) {

    	 var service = {
    	     ready: ready,
    	     contactus : contactus
        };
    	 return service;

      
          //Retrives the value from JSON file
        function contactus() {
            var deferred = $q.defer(); //promise
            $http({
                method: 'GET',
                url: "http://vikramaditya.vmokshagroup.com/vmokshagroup-dev/api/" +  'get_recent_posts'

            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

		 function ready(promisesArray) {
            return getReady()
                .then(function() {
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