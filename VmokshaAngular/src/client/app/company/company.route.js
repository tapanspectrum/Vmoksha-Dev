/* Description: The Company Route deals with maintaining all routes related to company modules.
 * Author:  Kirti 
 * Created On: 27/12/2016
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function () {
    'use strict';
    angular
        .module('app.company')
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
                state: 'pages',
                config: {
                    url:  '/service',
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
                            templateUrl: 'app/contents/service.html',
                            controller: 'Company',
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
                state: 'company',
                config: {
                    url:  '/company/aboutus/overview',
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
                            templateUrl: 'app/company/overview.html',
                            controller: 'Company',
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
                state: 'Expertise',
                config: {
                    url:  '/company/aboutus/expertise',
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
                            templateUrl: 'app/company/Expertise.html',
                            controller: 'Company',
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
                state: 'QualityCulture',
                config: {
                    url:  '/company/aboutus/qualityculture',
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
                            templateUrl: 'app/company/QualityCulture.html',
                            controller: 'Company',
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
                state: 'Infrastructure',
                config: {
                    url:  '/company/aboutus/infrastructure',
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
                            templateUrl: 'app/company/Infrastructure.html',
                            controller: 'Company',
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
                state: 'WhyVmoksha',
                config: {
                    url:  '/company/aboutus/whyvmoksha',
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
                            templateUrl: 'app/company/WhyVmoksha.html',
                            controller: 'Company',
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
                state: 'Culture',
                config: {
                    url:  '/company/culture',
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
                            templateUrl: 'app/company/Culture.html',
                            controller: 'Company',
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
                state: 'Testimonials',
                config: {
                    url:  '/company/testimonials',
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
                            templateUrl: 'app/company/Testimonials.html',
                            controller: 'Company',
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
                state: 'CorporateSocialResponsibilities',
                config: {
                    url:  '/company/corporate-social-responsibilities',
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
                            templateUrl: 'app/company/CorporateSocialResponsibilities.html',
                            controller: 'Company',
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
                state: 'page',
                config: {
                    url:  '/company/page',
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
                            templateUrl: 'app/company/page346.html',
                            controller: 'Company',
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
