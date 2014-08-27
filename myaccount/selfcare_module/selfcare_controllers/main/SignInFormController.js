(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  SignInFormController: function(scope,webStorage,authenticationService,rootScope) {
		  scope.loginCredentials = {};
		  rootScope.authenticationFailed = false;
		  rootScope.signInProcessLoading = false;
		  rootScope.emptyCredentials = false;
	      
	      scope.login = function() {
	    	  rootScope.authenticationFailed = false;
	    	  if(scope.loginCredentials.username&&scope.loginCredentials.password){
	    		  rootScope.signInProcessLoading = true;
	    		  rootScope.emptyCredentials = false;
	    		  webStorage.add("loginCredentials",scope.loginCredentials);
	    		  authenticationService.authenticateWithUsernamePassword(scope.loginCredentials);
	    	  }else {
	    		  rootScope.emptyCredentials = true;
	    	  }
	        
	      };
	      $('#pwd').keypress(function(e) {
	          if(e.which == 13) {
	              scope.login();
	          }
	        });
	      rootScope.$on("UserAuthenticationFailureEvent", function(data) {
	    	  rootScope.authenticationFailed = true;
	    	  rootScope.signInProcessLoading = false;
	    	  rootScope.emptyCredentials = false;
	      });
		  
    }
  });
  selfcare.ng.application.controller('SignInFormController', ['$scope','webStorage','AuthenticationService','$rootScope', selfcare.controllers.SignInFormController]);
}(selfcare.controllers || {}));
