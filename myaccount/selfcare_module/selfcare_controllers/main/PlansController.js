(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  PlansController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  scope.ordersData = [];
		  var clientTotalData= webStorage.get('clientTotalData');
		  //scope.ordersData = orderData.clientOrdersData;
		  RequestSender.getOrderResource.get({clientId:clientTotalData.clientId},function(data){
			  scope.ordersData = data.clientOrders;
		  });
    }
  });
  selfcare.ng.application.controller('PlansController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.PlansController]);
}(selfcare.controllers || {}));
