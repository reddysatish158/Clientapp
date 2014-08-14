(function(selfcare_module) {
   selfcare.controllers = _.extend(selfcare_module, {
	   SelfCareMainController: function(scope, translate,webStorage,sessionManager,RequestSender,authenticationService,location,modal) {

		   
		   scope.formData = {};
		   scope.currentSession = {};
	 //authentication onSuccess this event called  
	   scope.$on("UserAuthenticationSuccessEvent", function(event, data,formData) {
		   scope.currentSession = sessionManager.get(data,formData);
	        console.log(scope.currentSession);
	    });
	   
	 //authentication onFailure this event called  
	   scope.$on("UserAuthenticationFailureEvent", function(data) {
	        scope.authenticationFailed = true;
	     });
	  
	  //calling this method every time if session is exit or not
	   sessionManager.restore(function(session) {
	        scope.currentSession = session;
	    });
	   
		   
       //getting languages form model Lang.js 
	   scope.langs = selfcare.models.Langs;
        scope.optlang = scope.langs[0];
        
       //set the language code when change the language 
        scope.changeLang = function (lang) {
            translate.uses(lang.code);
            scope.optlang = lang;
        };
       
       //set the default values for the sign in and sign up buttons  
        scope.signUpFormView = false;
        scope.signInFormView = true;
       
      //sign up button fun start 
      scope.signUpBtnFun = function(){
    	  scope.signUpFormView=scope.signInFormView;
    	  scope.signInFormView=!scope.signUpFormView;
    	  scope.template="selfcare_module/views/clients/signupform.html"; 
    	  scope.authenticationFailed = false;
      };
      //sign up button fun end
      
      //sign In button fun start
      scope.signInBtnFun = function(){
    	  scope.signInFormView=scope.signUpFormView;
    	  scope.signUpFormView=!scope.signInFormView;
      };
      //sign up button fun end
      scope.login = function(){
    	  if(scope.formData.username&&scope.formData.password){
    		  authenticationService.authenticateWithUsernamePassword(scope.formData);
    	  }
      };
      
      scope.signout = function(){
    	  scope.currentSession = sessionManager.clear();
    	  location.path('/').replace;
      };
      
      var ClientActivePopupController = function($scope,$modalInstance){
			
			$scope.reject = function(){
				$modalInstance.close('delete');
			};
		};
		 scope.activetedClientPopup = function(){
			 modal.open({
				 templateUrl: 'clientactivepopup.html',
				 controller: ClientActivePopupController,
				 resolve:{}
	 			});
		 }
    }
  });
   selfcare.ng.application.controller('SelfCareMainController', ['$rootScope','$translate','webStorage','SessionManager','RequestSender','AuthenticationService','$location','$modal',selfcare.controllers.SelfCareMainController
  ]).run(function($log) {
      $log.info("SelfCareMainController initialized");
  });
}(selfcare.controllers || {}));
