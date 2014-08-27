(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ProfileController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  
		  scope.client = [];
		  var clientDatas = webStorage.get("clientTotalData");
		  scope.client = clientDatas.clientData;
		  /*RequestSender.clients.get({clientId:routeParams.clientId},function(data){
			  scope.client = data;
		  });*/
    }
  });
  selfcare.ng.application.controller('ProfileController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.ProfileController]);
}(selfcare.controllers || {}));
