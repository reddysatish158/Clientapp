(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  PaymentsController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  scope.paymentsData = [];
		  var paymentsData= webStorage.get('clientTotalData');
		 // scope.paymentsData = paymentsData.paymentsData;
		  RequestSender.FineTransactionResource.get({clientId: paymentsData.clientId,type:'PAYMENT' } , function(data){
			  scope.paymentsData = data;
		  });
    }
  });
  selfcare.ng.application.controller('PaymentsController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.PaymentsController]);
}(selfcare.controllers || {}));
