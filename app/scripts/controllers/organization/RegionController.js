(function(module) {
  mifosX.controllers = _.extend(module, {
	  RegionController: function(scope, resourceFactory,location,PermissionService) {
        scope.regions = [];
        scope.PermissionService = PermissionService;
        resourceFactory.regionResource.getRegion(function(data) {
            scope.regions = data;
        }); 
        scope.routeTo = function(id){
            location.path('/viewregions/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('RegionController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.RegionController]).run(function($log) {
    $log.info("RegionController initialized");
  });
}(mifosX.controllers || {}));
