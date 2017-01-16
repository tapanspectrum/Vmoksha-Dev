(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 2000;
        toastr.options.positionClass = 'toast-top-center purp-header-margin';
    }
    
    core.config(cacheConfig);

    /* @ngInject */
    function cacheConfig(CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, {
        maxAge: 3600000,
        deleteOnExpire: 'aggressive',
        onExpire: function (key, value) {
          var _this = this; // "this" is the cache in which the item expired
          angular.injector(['ng']).get('$http').get(key).success(function (data) {
            _this.put(key, data);
          });
        }
      });
    }
    

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle',
        viewLoaded: 'view.loaded'
    };


    var restApiHost = 'https://s3.amazonaws.com/sakura.data/';   

    var config = {
        appErrorPrefix: '[Vmoksha Technologies Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Vmoksha Technologies',
        docTitle: 'Vmoksha Technologies: ',
        events: events,
        restApiHost: restApiHost,        
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);
    /* @ngInject */
    function configure($urlRouterProvider, $stateProvider, $compileProvider, $logProvider,
                       routerHelperProvider, exceptionHandlerProvider) {
        $compileProvider.debugInfoEnabled(true);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);

    }
})();
