/* Description: The Demo Route deals with maintaining routes related to Demo modules.
 * Author:  Kirti V.
 * Created On: 27/12/2016
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';
    angular
        .module('app.demo')
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
                state: 'hello',               
                config: {
                    url: '/hello',
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
                            templateUrl: 'app/hello/hello.html',
                            controller: 'Hello',
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
