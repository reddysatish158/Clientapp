(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewContractController: function(scope, routeParams , location,resourceFactory ,PermissionService) {
        scope.contractperiod = [];
        scope.PermissionService = PermissionService;
        resourceFactory.contractResource.get({subscriptionId: routeParams.id} , function(data) {
            scope.contractperiod = data;
           
        });

        scope.deletecontract = function (){
            resourceFactory.contractResource.delete({subscriptionId: routeParams.id} , {} , function(data) {
                  location.path('/contract');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewContractController', ['$scope', '$routeParams', '$location','ResourceFactory','PermissionService', mifosX.controllers.ViewContractController]).run(function($log) {
    $log.info("ViewContractController initialized");
  });
}(mifosX.controllers || {}));
