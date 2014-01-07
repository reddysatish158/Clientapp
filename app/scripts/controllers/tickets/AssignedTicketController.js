(function(module) {
  mifosX.controllers = _.extend(module, {
	  AssignedTicketController: function(scope, resourceFactory,paginatorService,location) {
        
        scope.tickets = [];
       /* resourceFactory.assignedTicketsResource.get(function(data){
            scope.tickets = data;	
        });*/
        scope.routeToticket = function(id){
            location.path('/viewclient/'+id);
          };
        scope.ticketFetchFunction = function(offset, limit, callback) {
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit} , callback);
		};
		scope.tickets = paginatorService.paginate(scope.ticketFetchFunction, 14);
		
		
		scope.searchTickets123 = function(offset, limit, callback) {
	    	  resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchTickets = function(filterText) {
	  			scope.tickets = paginatorService.paginate(scope.searchTickets123, 14);
	  		};
     }
  });
  mifosX.ng.application.controller('AssignedTicketController', ['$scope', 'ResourceFactory','PaginatorService','$location', mifosX.controllers.AssignedTicketController]).run(function($log) {
    $log.info("AssignedTicketController initialized");
  });
}(mifosX.controllers || {}));
