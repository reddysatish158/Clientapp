(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  SignUpFormController: function(scope,RequestSender,modal,HttpService,webStorage,authenticationService,rootScope,sessionManager) {
		  //formData declaration
		  scope.formData = {};
		  
		  //set the default values
		  scope.isProcessing  = false;
		  
		  //adding returnUrl to formData form model returnURL.js
     	 scope.formData.returnUrl = selfcare.models.returnURL; 
		  
		 //Success pop-up Controller definition
		  var SuccessPopupController = function($scope,$modalInstance){
  			
  			$scope.mailId = scope.formData.userName;
  			
  			
  			$scope.reject = function(){
  				$modalInstance.close('delete');
  			};
  		};
  		
		var AlreadyExistPopupController = function($scope,$modalInstance){
		  			
		  			$scope.mailId = scope.formData.userName;
		  			
		  			
		  			$scope.reject = function(){
		  				$modalInstance.close('delete');
		  			};
		  };
		  
		  //submit functionality
          scope.submitEmail = function(){
        	  scope.isProcessing  = true;
        	  scope.formData.returnUrl = scope.formData.returnUrl+"/"+scope.formData.userName+"/";
        	  
        	  authenticationService.authenticateWithUsernamePassword(scope.formData);
        	  
        	  rootScope.registrationPopUp = function(registationData){
        		  
        		  if(registationData == "success"){
		        		  scope.isProcessing  = false;
			        		 modal.open({
					        			 templateUrl: 'successpopup.html',
					        			 controller: SuccessPopupController,
					        			 resolve:{}
			        		 			});
        		  }
        		  else{
        			  scope.isProcessing  = false;
        			  modal.open({
		        			 templateUrl: 'alredyexistpopup.html',
		        			 controller: AlreadyExistPopupController,
		        			 resolve:{}
     		 			});
        		  }
        	  };
        	  
          };
    }
  });
  selfcare.ng.application.controller('SignUpFormController', ['$scope','RequestSender','$modal','HttpService','webStorage','AuthenticationService','$rootScope','SessionManager', selfcare.controllers.SignUpFormController]);
}(selfcare.controllers || {}));
