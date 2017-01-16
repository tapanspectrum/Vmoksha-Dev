/* Description: The ErrorPage Controller deals with handling errors in the application .
 * Author: 
 * Created On: 
 * Modified For: 
 * Modified On:
 * Modified By:
 * */

(function() {
    'use strict';

    angular
        .module('app.errorpage')
        .controller('ErrorPage', ErrorPage);


    /* ngInject */
    function ErrorPage($state, routerHelper,logger, common, config, _, $sce, $rootScope, $scope, $timeout, $document, $log, toastr,store ,$injector) {
        // Global Variable Declaration
        var vm = this;
        vm.Error = {};
		vm.ImageContext = pph_config.ImageContext;
		
		//function for Clearing web storage
		function clearWebStorage(){
			//Clearing session storage
			sessionStorage.clear();
			//Clearing local storage 
			localStorage.clear();
			//Removing localstorage data from browser cache
			store.remove('loggedonuser');
			store.remove('authtoken');
			store.remove('IsRememberMe');
		}
		
		//If internet is not avaliable, cancelling all pending http requests
		function cancelHttpRequests(){			
			$injector.get('$http').pendingRequests.forEach(function(request) {
					if (request.cancel) {
						request.cancel.resolve();
					}
			});
		}
		
		if($state.current.name=="401"){
			vm.Error.Code="401";
			vm.Error.Message= "Un-Authorised Access";
			vm.Error.ActionText = "Your don't have permission to access this page.";
			vm.Error.ButtonText = "Back to Home";
			vm.Error.Image = vm.ImageContext + "images/error-icon.png";
			vm.Error.StateRedirect = "landing";
		}
		else if($state.current.name=="404"){
			vm.Error.Code="404";
			vm.Error.Message= "Page not found";
			vm.Error.ActionText = "Your page request could not be found.";
			vm.Error.ButtonText = "Back to Home";
			vm.Error.Image = vm.ImageContext + "images/error-icon.png";
			vm.Error.StateRedirect = "landing";
		}
		else if($state.current.name=="408"){
			cancelHttpRequests();
			//If login/signup popup opened, then closing it
			$rootScope.showLoginModal = false;
			$rootScope.showSignUpModal = false;
			vm.Error.Code="408";
			vm.Error.Message= "Request timeout";
			vm.Error.ActionText = "Please check your internet connection.";
			vm.Error.ButtonText = "Retry";
			vm.Error.Image = vm.ImageContext + "images/error-icon.png";
			vm.Error.StateRedirect = "landing";
			$timeout(function () {
			    $('#btnErrorPageAction').removeAttr('ui-sref');
			    $('#btnErrorPageAction').removeAttr('href');
			}, 200);
		}
		else if($state.current.name=="440"){
			clearWebStorage();
			$rootScope.IsLoggedIn = false;
			$rootScope.IsAdmin = false;			
			vm.Error.Code="440";
			vm.Error.Message= "Session Expired";
			vm.Error.ActionText = "Please login again.";
			vm.Error.ButtonText = "Login";
			vm.Error.Image = vm.ImageContext + "images/error-icon.png";
			vm.Error.StateRedirect = "landing";
			$timeout(function(){
				$('#btnErrorPageAction').removeAttr('ui-sref');
				$('#btnErrorPageAction').removeAttr('href');
			},200);
		}
		
		//Function called on action button click
		vm.errorPageAction = function(args){
		    if (args.Code == "440") {
		        $state.go('landing');
				if(!$rootScope.showSignUpModal){
					$rootScope.showLoginModal = !$rootScope.showLoginModal;
				}					
				else
				{
					$rootScope.showSignUpModal = false;
					$rootScope.showLoginModal= true;
				}					
			}
			else if (args.Code == "408") {
			    if (navigator.onLine) {
			        $state.go('landing');
			        $timeout(function () {
			            window.location.reload();
			        }, 200);			       
			    }			    
			}
		}
  }
})();

