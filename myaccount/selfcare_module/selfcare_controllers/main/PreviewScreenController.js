(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  PreviewScreenController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location) {
		  
		  scope.formData = {};
		  scope.clientData = {};
		 rootScope.currentSession= {user :'billing'};
		 scope.formData = webStorage.get("planFormData");
		 
		 scope.submitTotalData = function(){
			 console.log(scope.formData);
			 scope.clientData.fullname = scope.formData.fullName;
			 scope.clientData.city = scope.formData.city;
			 scope.clientData.phone = parseInt(scope.formData.mobileNo); 
			 scope.clientData.email = scope.formData.emailId; 
			 scope.clientData.paytermCode = scope.formData.paytermCode; 
			 scope.clientData.contractPeriod = scope.formData.contractperiod; 
			 scope.clientData.planCode = scope.formData.planCode; 
			 RequestSender.clientResource.save(scope.clientData,function(data){
				 rootScope.currentSession = sessionManager.clear();
				 location.path('/').replace();
				 rootScope.activetedClientPopup();
			 });
		 };
    }
  });
  selfcare.ng.application.controller('PreviewScreenController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location', selfcare.controllers.PreviewScreenController]);
}(selfcare.controllers || {}));
