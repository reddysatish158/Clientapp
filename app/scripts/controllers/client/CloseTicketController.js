(function(module) {
  mifosX.controllers = _.extend(module, {
	  CloseTicketController: function(scope,webStorage, routeParams , location,resourceFactory ) {		
            scope.statusTypes=[];
            scope.formData={};
            var clientData = webStorage.get('clientData');
		    scope.displayName=clientData.displayName;
		    scope.statusActive=clientData.statusActive;
		    scope.accountNo=clientData.accountNo;
		    scope.officeName=clientData.officeName;
		    scope.balanceAmount=clientData.balanceAmount;
		    scope.currency=clientData.currency;
		    scope.imagePresent=clientData.imagePresent;
		    scope.categoryType=clientData.categoryType;
	        scope.email=clientData.email;
	        scope.phone=clientData.phone;
        resourceFactory.ticketResourceTemplate.get(function(data) {       	 	
        	scope.statusTypes = data.statusType;				
        	scope.clientId=routeParams.clientId;
			scope.ticketId=routeParams.id;               
        });

        scope.submit = function() { 
            resourceFactory.closeTicketResource.update({'id': routeParams.id},this.formData,function(data){
                location.path('/tickets/'+routeParams.clientId);
             });
        };
    
    }
  });
  mifosX.ng.application.controller('CloseTicketController', ['$scope','webStorage','$routeParams', '$location','ResourceFactory', mifosX.controllers.CloseTicketController]).run(function($log) {
    $log.info("CloseTicketController initialized");
  });
}(mifosX.controllers || {}));