(function(module) {
	  mifosX.controllers = _.extend(module, {
		  RedemptionController: function(scope, resourceFactory, location,route) {
<<<<<<< HEAD
	        scope.formData={};
	        scope.submit = function() {  
	        	
	            resourceFactory.redemptionResource.save({}, scope.formData,function(data){
	            	location.path("/viewclient/"+ scope.formData.clientId);
=======
	        
			  scope.formData = {};
	        scope.submit = function() {  
	        	
	            resourceFactory.redemptionResource.save(scope.formData,function(data){
	            	location.path("/viewclient/"+scope.formData.clientId);
>>>>>>> 48a60ff22a3edd08cfeb7a5082c985a816595100
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('RedemptionController', ['$scope', 'ResourceFactory', '$location','$route', mifosX.controllers.RedemptionController]).run(function($log) {
	    $log.info("RedemptionController initialized");
	  });
	}(mifosX.controllers || {}));

