/* Description: The Demo Route deals with maintaining routes related to Demo modules.
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
        .run(appRun);
    appRun.$inject = ['routerHelper', '$rootScope', 'vmuisettings'];
    /* @ngInject */
    function appRun(routerHelper,$rootScope,vmuisettings) {
        routerHelper.configureStates(getStates(vmuisettings));
    }

    //Function to register states
    function getStates(vmuisettings) {        
        return [           
            {
                state: 'contactus',               
                config: {
                    url: '/contactus',
                    title: '/',
                    params: {},
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
                            templateUrl: 'app/contactus/contactus.html',
                            controller: 'Demo',
                            controllerAs: 'vm'
                        },
                        'footer': {
                            templateUrl: 'app/layout/footer.html',
                        }
                    }				
                }               
            }
        ];
    }
})();
