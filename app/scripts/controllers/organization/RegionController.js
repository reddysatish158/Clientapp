(function(module) {
  mifosX.controllers = _.extend(module, {
	  RegionController: function(scope, resourceFactory,location) {
        scope.regions = [];
        resourceFactory.regionResource.getRegion(function(data) {
            scope.regions = data;
        }); 
        scope.routeTo = function(id){
            location.path('/viewregions/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('RegionController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.RegionController]).run(function($log) {
    $log.info("RegionController initialized");
  });
}(mifosX.controllers || {}));
