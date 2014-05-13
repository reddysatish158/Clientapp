(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewServiceController: function(scope, routeParams, location, resourceFactory,PermissionService) {
        scope.service = [];
        scope.PermissionService = PermissionService; 
    
        resourceFactory.serviceResource.get({serviceId: routeParams.id} , function(data) {
            scope.service = data;
            scope.formdata ={};
        });
        
        scope.deleteservice = function (){
            resourceFactory.serviceResource.delete({serviceId: routeParams.id} , {} , function(data) {
                  location.path('/services');
                  
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewServiceController', ['$scope', '$routeParams', '$location', 'ResourceFactory','PermissionService', mifosX.controllers.ViewServiceController]).run(function($log) {
    $log.info("ViewServiceController initialized");
  });
}(mifosX.controllers || {}));
