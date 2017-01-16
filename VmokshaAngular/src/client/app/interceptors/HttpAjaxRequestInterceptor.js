 /* Description: The Http Request Interceptor to perform action during http request and http response.
   also deals with Handling JWT token authorization for each http request
 * Author:  
 * Created On: 
 * Modified For: 
 * Modified On:
 * Modified By:
 * */
angular.module('app.interceptor').factory( 'httpAjaxRequestInterceptor', ['$rootScope', '$q', '$window', '$location', 'store','$injector' ,function ( $rootScope, $q, $window, $location, store, $injector)
{
    return {
        'request': function ( config )
        {
            config.headers = config.headers || {};
            var authTokenFromLocalStorage = store.get('authtoken');
            var loggedOnUser = store.get('loggedonuser');
            if (config.url.match('/api') && !config.url.match('google')) {
                //Checking whether client is in online (internet is available)
                if (navigator.onLine) {
                    //If logged on user is normal user
                    if (null != loggedOnUser && loggedOnUser.UserTypeCode == pph_config.UserTypeCode_User) {
                        //If user tries to access unauthorised page
                        if (!_.contains(pph_config.StatesToSkipForAuthorization, $injector.get('$state').current.name)) {
                            if (loggedOnUser.RoleCode == pph_config.RoleCode_Developer) {
                                if (!_.contains(pph_config.DeveloperStates, $injector.get('$state').current.name)) {
                                    //Pass Invalid access token , to restrict api call
                                    config.headers["Authorization"] = "Inavlid Token";
                                }
                                else {
                                    config.headers["Authorization"] = authTokenFromLocalStorage;
                                    //$injector.get('$state').transitionTo('401');
                                }
                            }
                            else if (loggedOnUser.RoleCode == pph_config.RoleCode_Employee) {
                                if (!_.contains(pph_config.EmployeeStates, $injector.get('$state').current.name)) {
                                    //Pass Invalid access token , to restrict api call
                                    config.headers["Authorization"] = "Inavlid Token";
                                }
                                else {
                                    config.headers["Authorization"] = authTokenFromLocalStorage;
                                    //$injector.get('$state').transitionTo('401');
                                }
                            }
                            else if (loggedOnUser.RoleCode == pph_config.RoleCode_User) {
                                $rootScope.IsAdmin = false;
                                $rootScope.IsNavbarLoaded = true;
                                if (!_.contains(pph_config.NormalUserStates, $injector.get('$state').current.name)) {
                                    //Pass Invalid access token , to restrict api call
                                    config.headers["Authorization"] = "Inavlid Token";
                                }
                                else {
                                    config.headers["Authorization"] = authTokenFromLocalStorage;
                                    //$injector.get('$state').transitionTo('401');
                                }
                            }
                        }
                        else {
                            if (authTokenFromLocalStorage != null) {
                                //Pass valid access token
                                config.headers["Authorization"] = authTokenFromLocalStorage;
                            }
                        }
                    }
                    //If logged on user is admin
                    else {
                        if (authTokenFromLocalStorage != null) {
                            config.headers["Authorization"] = authTokenFromLocalStorage;
                        }
                    }					
				}
				else{
					//If internet is not avaliable, Redirecting to 408, request timeout page
					$injector.get('$state').transitionTo('408');					
				}				
			}
            return config;
        },       
        'response': function ( response )
        {
            //Manipulating api response
            return response;
        },
        'responseError': function ( response )
        {
            //Manipulating api response Error
            if (response.status === 401 && response.data.Message.match("Unauthorizedaccessduetoexpiredsecuritytoken"))
            {
                //Redirecting to 440 (Session Expired) page if the response is expired security token
                $injector.get('$state').transitionTo('440');
            }
            else if (response.status === 401 && response.data.Message.match("Unauthorizedaccessduetoinvalidsecuritytoken")) {
                //Redirecting to 401(Un-Authorised Access) page if the response is unauthorized security token
                $injector.get('$state').transitionTo('401');
            }
            return $q.reject(response);
        }
    };
} ]);
