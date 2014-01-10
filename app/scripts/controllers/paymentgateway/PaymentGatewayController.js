(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentGatewayController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService) {
		  
        scope.paymentgatewaydatas = [];
        
        var callingTab = webStorage.get('callingTab',null);
        if(callingTab == null){
        	callingTab="";
        }else{
		  scope.displayTab=callingTab.someString;
		 
		  if( scope.displayTab == "ProvisioningTab"){		 
			  scope.hardwarePlanMappingTab =  true;
			  webStorage.remove('callingTab');
		  }else
		  {
			  webStorage.remove('callingTab');
		  };
		 
        }

        resourceFactory.paymentGatewayResource.get(function(data) {
        	 scope.paymentgatewaydatas=data; 
        });

	  		 scope.paymentGatewayFailureData = function(offset, limit, callback) {
	  			 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, tabType: 'Failure'} , callback);
	 		};
	  		
	  		scope.getPaymentGateway = function () {
	        	scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewayFailureData, 14);
	        };
	        
	        scope.getPaymentGatewaySuccess = function () {
	        	scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewaySuccessData, 14);
	        };
	        scope.paymentGatewaySuccessData = function(offset, limit, callback) {
	  			 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, tabType: 'Success'} , callback);
	 		};
	 		
	 		scope.searchFailedPaymentData = function(offset, limit, callback) { 
		    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
		    		  sqlSearch: scope.filterText, tabType: 'Failure'} , callback);
		          };
		  		
		  	scope.searchFailedPaymentId = function(filterText) {
		  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchFailedPaymentData, 14);
		  		};
		  		
		  	scope.searchSuccessPaymentData = function(offset, limit, callback) { 
			    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
			    		  sqlSearch: scope.filterText, tabType: 'Success'} , callback);
			          };
			  		
		    scope.searchSuccessPaymentId = function(filterText) {
			  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchSuccessPaymentData, 14);
			  		};		

        
    }
  });
  mifosX.ng.application.controller('PaymentGatewayController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.PaymentGatewayController]).run(function($log) {
    $log.info("PaymentGatewayController initialized");
  });
}(mifosX.controllers || {}));


