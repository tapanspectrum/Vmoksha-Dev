'use strict';
angular
    .module('app.core')
    .provider('facebookSDK', function () {
	//console.log("Inside facebookSDK Provider");
	// https://developers.facebook.com/docs/facebook-login/getting-started-web/

	var loadScript = function (d, cb) {
		var js = d.createElement('script');
		js.async = true;
		js.src = '//connect.facebook.net/en_US/sdk.js';
		js.onreadystatechange = function () {
			if (this.readyState == 'complete') {
				cb();
			}
		}
		js.onload = cb;
		d.getElementsByTagName('body')[0].appendChild(js);
	}

	this.$get = ['$q', '$timeout', '$rootScope', 'vmuisettings', function ($q, $timeout, $rootScope, vmuisettings) {
      	var deferred = $q.defer();    
      		loadScript(document, function (callback) {
      			FB.init({
      			    //appId: '216961558678671', //PROTON's app ID
      			    appId: vmuisettings.FacebookApiKey,
      				cookie: true,  // enable cookies to allow the server to access 
      				// the session
      				xfbml: true,  // parse social plugins on this page
      				version: 'v2.6' // use version 2.2
      			});
      			$timeout(function () {
      				deferred.resolve(FB);
      			});
      		});     

      	return deferred.promise;
      }
	];
});