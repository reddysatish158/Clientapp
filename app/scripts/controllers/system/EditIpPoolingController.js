(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditIpPoolingController: function(scope, resourceFactory, routeParams, location, $modal, PermissionService) {
	        
	        scope.formData = {};	
	        scope.ippoolstatusType= [{statusType:"F"}];
	            
	            scope.submit = function() {        
	            resourceFactory.ipPoolingResource.update({'id': routeParams.id},this.formData,function(data){
	                location.path('/ipPooling');
	             });
	        };
	    
	  }
  });
  mifosX.ng.application.controller('EditIpPoolingController', ['$scope', 'ResourceFactory', '$routeParams', '$location','$modal','PermissionService', mifosX.controllers.EditIpPoolingController]).run(function($log) {
    $log.info("EditIpPoolingController initialized");
  });
}(mifosX.controllers || {}));
