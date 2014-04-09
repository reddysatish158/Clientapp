(function(module) {
  mifosX.controllers = _.extend(module, {
	  PlanController: function(scope, resourceFactory,location,PermissionService) {
        scope.plans = [];
        scope.PermissionService = PermissionService;
        resourceFactory.planResource.getAllPlans(function(data) {
            scope.plans= data;
        });
        scope.routeTo = function(id){
            location.path('/viewplan/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('PlanController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.PlanController]).run(function($log) {
    $log.info("PlanController initialized");
  });
}(mifosX.controllers || {}));
