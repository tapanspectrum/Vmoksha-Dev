/* Description: The Error Page Route deals with maintaining the routes.
* Author:  Avinash
* Created On: 12-10-2016 11:58:07
* Modified For: 
* Modified On:
* Modified By:
* */

(function () {
   'use strict';
   angular
       .module('app.errorpage')
       .run(appRun);
   appRun.$inject = ['routerHelper'];
   /* ngInject */
   function appRun(routerHelper) {
       routerHelper.configureStates(getStates());
   }

   //Function to register states
   function getStates() {        
       return [
           {
               state: '401',
               config: {
                   url: '/401',
                   title: '/',
                   settings: {
                       nav: 1
                   },
                   views: {
                       'header': {
                           templateUrl: 'app/layout/header.html',
                           controller: 'Shell',
                           controllerAs: 'vm'
                       },
                       'content': {
                           templateUrl: 'app/errorpage/errorpage.index.html',
                           controller: 'ErrorPage',
                           controllerAs: 'vm'
                       },
                       'footer': {
						   templateUrl: 'app/layout/footer.html'
                       }
                   }
               }
           },         
           {
               state: '404',
               config: {
                   url: '/404',
                   title: '/',
                   settings: {
                       nav: 1
                   },
                   views: {
                       'header': {
                           templateUrl: 'app/layout/header.html',
                           controller: 'Shell',
                           controllerAs: 'vm'
                       },
                       'content': {
                           templateUrl: 'app/errorpage/errorpage.index.html',
                           controller: 'ErrorPage',
                           controllerAs: 'vm'
                       },
                       'footer': {
						   templateUrl: 'app/layout/footer.html'
                       }
                   }
               }
           },        
           {
               state: '408',
               config: {
                   url: '/408',
                   title: '/',
                   settings: {
                       nav: 1
                   },
                   views: {
                       'header': {
                           templateUrl: 'app/layout/header.html',
                           controller: 'Shell',
                           controllerAs: 'vm'
                       },
                       'content': {
                           templateUrl: 'app/errorpage/errorpage.index.html',
                           controller: 'ErrorPage',
                           controllerAs: 'vm'
                       },
                       'footer': {
						   templateUrl: 'app/layout/footer.html'
                       }
                   }
               }
           },         
           {
               state: '440',
               config: {
                   url: '/440',
                   title: '/',
                   settings: {
                       nav: 1
                   },
                   views: {
                       'header': {
                           templateUrl: 'app/layout/header.html',
                           controller: 'Shell',
                           controllerAs: 'vm'
                       },
                       'content': {
                           templateUrl: 'app/errorpage/errorpage.index.html',
                           controller: 'ErrorPage',
                           controllerAs: 'vm'
                       },
                       'footer': {
						   templateUrl: 'app/layout/footer.html'
                       }
                   }
               }
           }
       ];
   }
})();
