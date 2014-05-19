(function(module) {
  mifosX.controllers = _.extend(module, {
	  EventController: function(scope, resourceFactory,location,PermissionService) {
        scope.eventss = [];
        scope.PermissionService = PermissionService;
        resourceFactory.eventResource.get(function(data) {      	
            scope.events= data;         
        });
        scope.routeTo = function(id){
        		location.path('/viewEvent/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('EventController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.EventController]).run(function($log) {
    $log.info("EventController initialized");
  });
}(mifosX.controllers || {}));