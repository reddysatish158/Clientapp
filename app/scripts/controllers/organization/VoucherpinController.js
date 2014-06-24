(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory,PermissionService,rootScope,API_VERSION,route) {
        scope.voucherpins = [];
        scope.PermissionService = PermissionService;
        resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        });
        
        scope.processFile = function(id){
        	rootScope.processFileLoading = true;
        	rootScope.voucherPinProcess = true;
        	resourceFactory.voucherpinResource.save({batchId:id},function(data) {
        		rootScope.processFileLoading = false;
        		rootScope.voucherPinProcess = false;
        		route.reload();
            });
        };
        
        scope.downloadFile = function (id){
        	
            window.open(rootScope.hostUrl+ API_VERSION +'/randomgenerators/'+id+'?tenantIdentifier=default');
       };
    }
  
  
  });
  mifosX.ng.application.controller('VoucherpinController', ['$scope', 'ResourceFactory','PermissionService','$rootScope','API_VERSION','$route', mifosX.controllers.VoucherpinController]).run(function($log) {
	  
    $log.info("VoucherpinController initialized");
  });
}(mifosX.controllers || {}));
