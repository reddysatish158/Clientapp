(function(selfcare_module) {
   selfcare.services = _.extend(selfcare_module, {
    SessionManager: function(scope,webStorage, httpService,RequestSender,location) {
      var EMPTY_SESSION = {user:null};

      this.get = function(data,formData) {
          webStorage.add("sessionData", {userId: data.userId, authenticationKey: data.base64EncodedAuthenticationKey});
          httpService.setAuthorization(data.base64EncodedAuthenticationKey);
          if(formData.userName){
	          RequestSender.registrationResource.save(formData,function(successData){
	        	  scope.registrationPopUp("success");
	        	  webStorage.remove("sessionData");
	        	  scope.currentSession= {user :null};
		          },function(errorData){
		        	  scope.registrationPopUp("failure");
		        	  webStorage.remove("sessionData");
		        	  scope.currentSession= {user :null};
		          });
          }else if(formData.verificationKey){
        	  RequestSender.registrationResource.update(formData,function(successData) {
        		  scope.activationPopup("success");
        		  scope.currentSession= {user :'selfcare'};
	          },function(errorData){
	        	  scope.activationPopup("failure");
	        	  scope.currentSession= {user :'sefcare'};
	          });
          }else if(formData.username){
        	  RequestSender.loginUser.save(formData,function(successData){
        		  scope.currentSession= {user :'selfcare'};
        		  scope.authenticationFailed = false;
        		  location.path('/clients/'+successData.clientId);
        	  },function(errorData){
        		  webStorage.remove("sessionData");
        		  scope.currentSession= {user:null};
        		  scope.$broadcast("UserAuthenticationFailureEvent", data);
        	  });
          }
        };

      this.clear = function() {
        webStorage.remove("sessionData");
        webStorage.remove("clientData");
        httpService.cancelAuthorization();
        return scope.currentSession= {user:null};
      };

        this.restore = function(handler) {
            var sessionData = webStorage.get('sessionData');
            if (sessionData !== null) {
              httpService.setAuthorization(sessionData.authenticationKey);
              RequestSender.userResource.get({userId: sessionData.userId}, function(userData) {
                handler({user: 'selfcare'});
              });
            } else {
              handler(EMPTY_SESSION);
            }
        };
    }
  });
   selfcare.ng.services.service('SessionManager', [
	'$rootScope',
    'webStorage',
    'HttpService',
    'RequestSender',
    '$location',
    selfcare.services.SessionManager
  ]);
}(selfcare.services || {}));
