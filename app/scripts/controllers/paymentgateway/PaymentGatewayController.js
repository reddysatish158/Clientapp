(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentGatewayController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService) {
        scope.paymentgatewaydatas = [];
        alert(1);
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
     
        scope.getgetpaymentGatewayData=function(data){
        	
        	resourceFactory.hardwareMappingResource.get(function(data) {
           	 scope.hardwaremappingdatas=data; 
           });
        	
        };
        
        
        scope.getProvisiongCommandData=function(data){
          	 
          	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
              	 scope.provisiongsystemData=data; 
              });
          };
        
    }
  });
  mifosX.ng.application.controller('PaymentGatewayController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.PaymentGatewayController]).run(function($log) {
    $log.info("PaymentGatewayController initialized");
  });
}(mifosX.controllers || {}));


