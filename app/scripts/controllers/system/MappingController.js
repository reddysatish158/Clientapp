(function(module) {
  mifosX.controllers = _.extend(module, {
	  MappingController: function(scope, routeParams, location, resourceFactory, paginatorService) {
        scope.servicemappingdatas = [];
        scope.hardwaremappingdatas= [];
        
        resourceFactory.mappingResource.get(function(data) {
        	 scope.servicemappingdatas=data; 
        });
     
        scope.getHardwareMappingData=function(data){
        	
        	resourceFactory.hardwareMappingResource.get(function(data) {
           	 scope.hardwaremappingdatas=data; 
           });
        	
        };
        
    }
  });
  mifosX.ng.application.controller('MappingController', ['$scope', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.MappingController]).run(function($log) {
    $log.info("MappingController initialized");
  });
}(mifosX.controllers || {}));


