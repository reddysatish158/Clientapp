(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory,PermissionService) {
        scope.voucherpins = [];
        scope.PermissionService = PermissionService;
        resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        }); 
    }
  });
  mifosX.ng.application.controller('VoucherpinController', ['$scope', 'ResourceFactory','PermissionService', mifosX.controllers.VoucherpinController]).run(function($log) {
    $log.info("VoucherpinController initialized");
  });
}(mifosX.controllers || {}));
