'use strict';
angular
    .module('app.core')
    .factory('facebookService', ['$http', 'store', '$window', '$q', 'facebookSDK', function ($http, store, $window, $q, facebookSDK) {
	return {
		//------------------------------------------------------------------------------------------------------
		 LoginStatus: function () {
		 	var deferred = $q.defer(); //promise	
		 	facebookSDK.then(function (res) {		 		
		 		FB.getLoginStatus(function (response) {
		 			deferred.resolve(response);
		 		});		 		
		 	}, function () {
		 		console.log("Error");
		 		deferred.reject('SDK failed to load because your app ID wasn\'t set');
		 	});
		 	return deferred.promise;
		 },
		//------------------------------------------------------------------------------------------------------
		 SignIn: function (FB) {
			//TODO: Implementation pending
		 	var deferred = $q.defer(); //promise			 	
		 	return deferred.promise;
		 },
		//------------------------------------------------------------------------------------------------------
		 SignOut: function (FB) {
		 	//TODO: Implementation pending
		 	var deferred = $q.defer(); //promise			 	
		 	return deferred.promise;
		 },
		//------------------------------------------------------------------------------------------------------
		 Register: function (FB) {
		 	//TODO: Implementation pending
		 	var deferred = $q.defer(); //promise			 	
		 	return deferred.promise;
		 },
		//------------------------------------------------------------------------------------------------------
		 MyProfile: function (req) {
		 	var deferred = $q.defer(); //promise	
		 	//Test Code for facebook service
		 	this.LoginStatus().then(function (res) {
		 	    FB.api('/me',{
		 	        fields: req
		 	    },function (response) {		 	        
		 			deferred.resolve(response);		 			
		 		});
		 	}, function (error) {
		 		deferred.reject(error);
		 		console.log('Error', error);
		 	});
		 	return deferred.promise;
		 }
	}
}]);