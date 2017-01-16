/* Description: The Admin Route deals with maintaining all routes related to admin and super admin modules.
 * Author:  Kirti 
 * Created On: 27/12/2016
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';
    angular
        .module('app.landing')
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
                state: 'landing',
                config: {
                    url:  '/',
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
                            templateUrl: 'app/landing/landing.content.html',
                            controller: 'Landing',
                            controllerAs: 'vm'
                        },
                        'footer': {
                            templateUrl: 'app/layout/footer.html',
                            controller: 'Shell',
                            controllerAs: 'vm'
                        }
                    }
                }
            },  

        ];
    }
})();
