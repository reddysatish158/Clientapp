(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewProvisioningMappingController: function(scope, routeParams , route, location, resourceFactory, http) {
		  
        scope.provisiongdata = {};              
        resourceFactory.provisioningMappingResource.get({provisioningId: routeParams.id} , function(data) {
            scope.provisiongdata = data;                                                
        });     
        
        scope.deleteProvisioning = function (){
            resourceFactory.provisioningMappingResource.delete({provisioningId: routeParams.id} , {} , function(data) {
                  location.path('/mappingconfig');      
            });
          };
    }
  
  
  });
  mifosX.ng.application.controller('ViewProvisioningMappingController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewProvisioningMappingController]).run(function($log) {
    $log.info("ViewProvisioningMappingController initialized");
  });
}(mifosX.controllers || {}));
