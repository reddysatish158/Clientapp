(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewRegionController: function(scope, routeParams , location,resourceFactory,PermissionService ) {		
        scope.region = [];
        scope.PermissionService = PermissionService;
        resourceFactory.regionResource.get({regionId: routeParams.id} , function(data) {
            scope.region = data;          
           
        });

        scope.deleteRegion = function (){
            resourceFactory.regionResource.delete({regionId: routeParams.id} , {} , function(data) {
                  location.path('/regions');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewRegionController', ['$scope', '$routeParams', '$location','ResourceFactory','PermissionService', mifosX.controllers.ViewRegionController]).run(function($log) {
    $log.info("ViewRegionController initialized");
  });
}(mifosX.controllers || {}));