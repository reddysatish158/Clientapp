(function(module) {
  mifosX.controllers = _.extend(module, {
	  ContractController: function(scope, resourceFactory,location,PermissionService) {
        scope.employees = [];
        scope.PermissionService = PermissionService;
        resourceFactory.contractResource.getAllContracts(function(data) {
            scope.employees = data;
        });
        scope.routeTo = function(id){
            location.path('/viewContract/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('ContractController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.ContractController]).run(function($log) {
    $log.info("ContractController initialized");
  });
}(mifosX.controllers || {}));
