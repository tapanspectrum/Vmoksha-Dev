/* Description: The Sevices Route deals with maintaining all routes related to Sevices modules.
 * Author:  Kirti 
 * Created On: 16/1/201
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';
    angular
        .module('app.services')
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
                state: 'application_development',
                config: {
                    url:  '/services/application-engineering/application-development',
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
                            templateUrl: 'app/services/application_development.html',
                            controller: 'Services',
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

            {
                state: 'application_management',
                config: {
                    url:  '/services/application-engineering/application-management',
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
                            templateUrl: 'app/services/application_management.html',
                            controller: 'Services',
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

            {
                state: 'internet_of_things',
                config: {
                    url:  '/services/application-engineering/internet-of-things',
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
                            templateUrl: 'app/services/internet_of_things.html',
                            controller: 'Services',
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


            {
                state: 'enterprise_mobility_overview',
                config: {
                    url:  '/services/enterprise-mobility-services/mobility-services-overview',
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
                            templateUrl: 'app/services/enterprise_mobility_overview.html',
                            controller: 'Services',
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


            {
                state: 'mobility_service_offerings',
                config: {
                    url:  '/services/enterprise-mobility-services/mobility-service-offerings',
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
                            templateUrl: 'app/services/mobility_service_offerings.html',
                            controller: 'Services',
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

            {
                state: 'testing_services_overview',
                config: {
                    url:  '/services/testing-services/testing-services-overview',
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
                            templateUrl: 'app/services/testing_services_overview.html',
                            controller: 'Services',
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

            {
                state: 'testing_services_offerings',
                config: {
                    url:  '/services/testing-services/testing-services-offerings',
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
                            templateUrl: 'app/services/testing_services_offerings.html',
                            controller: 'Services',
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

            {
                state: 'test_tools_and_technologies',
                config: {
                    url:  '/services/testing-services/test-tools-and-technologies',
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
                            templateUrl: 'app/services/test_tools_and_technologies.html',
                            controller: 'Services',
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

            {
                state: 'cloud_computing_overview',
                config: {
                    url:  '/services/cloud-computing/cloud-computing-overview',
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
                            templateUrl: 'app/services/cloud_computing_overview.html',
                            controller: 'Services',
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
            {
                state: 'cloud_development',
                config: {
                    url:  '/services/cloud-computing/cloud-development',
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
                            templateUrl: 'app/services/cloud_development.html',
                            controller: 'Services',
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


            {
                state: 'remote_infrastructure_management',
                config: {
                    url:  '/services/cloud-computing/cloud-development',
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
                            templateUrl: 'app/services/remote_infrastructure_management.html',
                            controller: 'Services',
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
            {
                state: 'rim_offerings',
                config: {
                    url:  '/services/cloud-computing/cloud-development',
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
                            templateUrl: 'app/services/rim_offerings.html',
                            controller: 'Services',
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
            {
                state: 'rim_business_benefits',
                config: {
                    url:  '/services/cloud-computing/cloud-development',
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
                            templateUrl: 'app/services/rim_business_benefits.html',
                            controller: 'Services',
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
