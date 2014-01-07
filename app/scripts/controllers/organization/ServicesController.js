(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServicesController: function(scope, resourceFactory,location) {
        
        scope.services = [];
        resourceFactory.serviceResource.getAllServices(function(data){
            scope.services = data;
        });
        scope.routeTo = function(id){
            location.path('/viewservice/'+ id);
          };
     }
  });
  mifosX.ng.application.controller('ServicesController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.ServicesController]).run(function($log) {
    $log.info("ServicesController initialized");
  });
}(mifosX.controllers || {}));
