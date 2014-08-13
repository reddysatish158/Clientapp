(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ActivateUserController: function(scope,RequestSender,rootScope,routeParams,modal,
			  							webStorage,HttpService,authenticationService,sessionManager,location) {
		  
		  	scope.isActive=false;
		  	scope.isAlreadyActive=false;
		  //getting the key value form routeParams
		  var email = routeParams.mailId;
		  webStorage.add("emailId",email);
		  var actualKey = routeParams.registrationKey;
		  var sliceKey = actualKey.slice(0, 27);
		  
		  rootScope.registrationKey = {'verificationKey' : sliceKey};
		  
		/*//Active pop-up Controller definition
		  var ActivePopupController = function($scope,$modalInstance){
  			$scope.closePopup = function(){
  				$modalInstance.close('delete');
  			}
  			$scope.reject = function(){
  				$modalInstance.close('delete');
  			};
  		};*/
		  
  		scope.goToSignInPage = function(){
  			scope.currentSession = sessionManager.clear();
  	    	  location.path('/').replace;
  		};
  		
  		authenticationService.authenticateWithUsernamePassword(rootScope.registrationKey);
  		
  		rootScope.activationPopup = function(activationData) {
  			if(activationData =="success"){
  				scope.isActive=true;
			 /* modal.open({
     			 templateUrl: 'activepopup.html',
     			 controller: ActivePopupController,
     			 resolve:{}
     		 });*/
  			}
  			else{
  				scope.isAlreadyActive=true;
  				console.log("activation failure");
  			}
    	  };
  		//var sessionData = webStorage.get('sessionData');
  		/*if(sessionData){
  			 RequestSender.registrationResource.update(scope.registrationKey,function(data) {
  				  modal.open({
  	     			 templateUrl: 'activepopup.html',
  	     			 controller: ActivePopupController,
  	     			 resolve:{}
  	     		 });
  	    	  });
  		}
  		else{
			  		var apiVer = '/obsplatform/api/v1';
			  	  HttpService.post(apiVer + "/authentication?username=billing&password=password")
			        .success(function(sessionData) {
			      	 console.log("success");
			      	 webStorage.add("sessionData", {userId: sessionData.userId, authenticationKey: sessionData.base64EncodedAuthenticationKey});
			      	 
					        	
					        	 RequestSender.registrationResource.update(scope.registrationKey,function(data) {
					  				  modal.open({
					  	     			 templateUrl: 'activepopup.html',
					  	     			 controller: ActivePopupController,
					  	     			 resolve:{}
					  	     		 });
					  	    	  });
			        })
			        .error(function(data) {
			      	  console.log("failure");
			        });
  		}*/
		  
    }
  });
  selfcare.ng.application.controller('ActivateUserController', 
 ['$scope','RequestSender','$rootScope','$routeParams','$modal','webStorage','HttpService','AuthenticationService',
  'SessionManager','$location',selfcare.controllers.ActivateUserController]);
}(selfcare.controllers || {}));
