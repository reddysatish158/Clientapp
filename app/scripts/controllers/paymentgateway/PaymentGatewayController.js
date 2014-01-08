(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentGatewayController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService) {
        scope.paymentgatewaydatas = [];

      
        var callingTab = webStorage.get('callingTab',null);
        if(callingTab == null){
        	callingTab="";
        }else{
		  scope.displayTab=callingTab.someString;
		 
		  if( scope.displayTab == "hardwarePlanMapping"){		 
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

        
    }
  });
  mifosX.ng.application.controller('PaymentGatewayController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.PaymentGatewayController]).run(function($log) {
    $log.info("PaymentGatewayController initialized");
  });
}(mifosX.controllers || {}));


