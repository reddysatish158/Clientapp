(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ClientsController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  
		  scope.client = [];
		  RequestSender.clients.get({clientId:routeParams.clientId},function(data){
			  scope.client = data;
		  });
    }
  });
  selfcare.ng.application.controller('ClientsController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.ClientsController]);
}(selfcare.controllers || {}));
