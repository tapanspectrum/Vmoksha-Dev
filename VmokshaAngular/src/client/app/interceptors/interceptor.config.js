/* Description: It is used for configuring interceptor applicable throughout application
 * Author: 
 * Created On: 
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';
    angular
        .module('app.interceptor')
        .config([
          '$locationProvider', '$httpProvider', function ($locationProvider, $httpProvider) {
              //Add the http ajax request interceptors
              $httpProvider.interceptors.push('httpAjaxRequestInterceptor');
          }]);
})();