(function(module) {
	  mifosX.controllers = _.extend(module, {
		  RedemptionController: function(scope, resourceFactory, location,route) {
	        
	        scope.submit = function() {  
	        	
	            resourceFactory.redemptionResource.postRedemption({clientId : scope.clientId,pinValue : scope.pinValue},{},function(data){
	            	route.reload();
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('RedemptionController', ['$scope', 'ResourceFactory', '$location','$route', mifosX.controllers.RedemptionController]).run(function($log) {
	    $log.info("RedemptionController initialized");
	  });
	}(mifosX.controllers || {}));

