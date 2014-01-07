(function(module) {
  mifosX.controllers = _.extend(module, {
	  EventController: function(scope, resourceFactory,location) {
        scope.eventss = [];
        resourceFactory.eventResource.get(function(data) {      	
            scope.events= data;         
        });
        scope.routeTo = function(id){
            location.path('/viewEvent/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('EventController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.EventController]).run(function($log) {
    $log.info("EventController initialized");
  });
}(mifosX.controllers || {}));