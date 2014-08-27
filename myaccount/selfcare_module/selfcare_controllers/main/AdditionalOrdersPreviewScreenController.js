(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  AdditionalOrdersPreviewScreenController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,dateFilter) {
		  
		  scope.formData = {};
		  scope.orderBookingData = {};
		 scope.formData = webStorage.get("additionalPlanFormData");
		 console.log(scope.formData);
		 
		 scope.orderBookingData.billAlign = true;
		 scope.orderBookingData.isNewplan = true;
		 scope.orderBookingData.locale = 'en'; 
		 scope.orderBookingData.dateFormat = 'dd MMMM yyyy'; 
		 var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
		 scope.orderBookingData.start_date =  reqDate; 
		 scope.orderBookingData.paytermCode = scope.formData.paytermCode; 
		 scope.orderBookingData.contractPeriod = scope.formData.contractperiod; 
		 scope.orderBookingData.planCode = scope.formData.planCode; 
		 
		 RequestSender.bookOrderResource.save({clientId : scope.formData.clientId},scope.orderBookingData,function(data){
			 webStorage.remove('additionalPlanFormData');
			 location.path('/additionalOrders');
		 });
		 
		/* scope.submitTotalData = function(){
			 
			 scope.orderBookingData.billAlign = true;
			 scope.orderBookingData.isNewplan = true;
			 scope.orderBookingData.locale = 'en'; 
			 scope.orderBookingData.dateFormat = 'dd MMMM yyyy'; 
			 var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
			 scope.orderBookingData.start_date =  reqDate; 
			 scope.orderBookingData.paytermCode = scope.formData.paytermCode; 
			 scope.orderBookingData.contractPeriod = scope.formData.contractperiod; 
			 scope.orderBookingData.planCode = scope.formData.planCode; 
			 
			 RequestSender.bookOrderResource.save({clientId : scope.formData.clientId},scope.orderBookingData,function(data){
				 webStorage.remove('additionalPlanFormData');
				 location.path('/additionalOrders');
			 });
		 };*/
    }
  });
  selfcare.ng.application.controller('AdditionalOrdersPreviewScreenController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','dateFilter', selfcare.controllers.AdditionalOrdersPreviewScreenController]);
}(selfcare.controllers || {}));
