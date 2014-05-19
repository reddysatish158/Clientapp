(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory,PermissionService,$rootScope,API_VERSION) {
        scope.voucherpins = [];
        scope.PermissionService = PermissionService;
        resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        }); 
        
        scope.downloadFile = function (id){
        	
            window.open($rootScope.hostUrl+ API_VERSION +'/randomgenerators/'+id+'?tenantIdentifier=default');
       };
    }
  
  
  });
  mifosX.ng.application.controller('VoucherpinController', ['$scope', 'ResourceFactory','PermissionService','$rootScope','API_VERSION', mifosX.controllers.VoucherpinController]).run(function($log) {
	  
    $log.info("VoucherpinController initialized");
  });
}(mifosX.controllers || {}));
