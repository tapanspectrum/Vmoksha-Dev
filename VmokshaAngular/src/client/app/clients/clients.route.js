/* Description: The Clients Route deals with maintaining all routes related to Clients modules.
 * Author:  Kirti 
 * Created On: 19/1/2017
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';
    angular
        .module('app.clients')
        .run(appRun)
    appRun.$inject = ['routerHelper', 'vmuisettings'];
    /* @ngInject */
    function appRun(routerHelper, vmuisettings) {
        routerHelper.configureStates(getStates(vmuisettings),  '/');
    }

    //Function to register states
    function getStates(vmuisettings) {        
        return [           
            {
                state: 'clients',
                config: {
                    url:  '/clients',
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
                            templateUrl: 'app/clients/clients.html',
                            controller: 'Clients',
                            controllerAs: 'vm'
                        },
                        'footer': {
                            templateUrl: 'app/layout/footer.html',
                            controller: 'Shell',
                            controllerAs: 'vm'
                        }
                    }
                }
            }

          
        ];
    }
})();
