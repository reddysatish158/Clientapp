(function(module) {
  mifosX.controllers = _.extend(module, {
	  MessageController: function(scope, resourceFactory,location) {
	        scope.message = [];
	        resourceFactory.messageResource.getAllMessages(function(data) {
	            scope.message = data;
	        });
	        scope.routeTo = function(id){
	            location.path('/viewmessage/'+ id);
	          };
	    }
  });
  mifosX.ng.application.controller('MessageController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.MessageController]).run(function($log) {
    $log.info("MessageController initialized");
  });
}(mifosX.controllers || {}));