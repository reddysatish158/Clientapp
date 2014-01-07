(function(module) {
  mifosX.controllers = _.extend(module, {
	  PlanController: function(scope, resourceFactory,location) {
        scope.plans = [];
        resourceFactory.planResource.getAllPlans(function(data) {
            scope.plans= data;
        });
        scope.routeTo = function(id){
            location.path('/viewplan/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('PlanController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.PlanController]).run(function($log) {
    $log.info("PlanController initialized");
  });
}(mifosX.controllers || {}));
