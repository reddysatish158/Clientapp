(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewOfficeController: function(scope, routeParams , resourceFactory ,PermissionService) {
        scope.charges = [];
        scope.PermissionService = PermissionService;
        resourceFactory.officeResource.get({officeId: routeParams.id} , function(data) {
            scope.office = data;
        });
    }
  });
  mifosX.ng.application.controller('ViewOfficeController', ['$scope', '$routeParams','ResourceFactory','PermissionService', mifosX.controllers.ViewOfficeController]).run(function($log) {
    $log.info("ViewOfficeController initialized");
  });
}(mifosX.controllers || {}));
