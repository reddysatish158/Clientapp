(function(module) {
  mifosX.controllers = _.extend(module, {
	  AssignedTicketController: function(scope, resourceFactory,paginatorService,location,PermissionService) {
        
        scope.tickets = [];
       /* resourceFactory.assignedTicketsResource.get(function(data){
            scope.tickets = data;	
        });*/
        scope.routeToticket = function(id){
        	if(PermissionService.showMenu('READ_CLIENT'))
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
  mifosX.ng.application.controller('AssignedTicketController', ['$scope', 'ResourceFactory','PaginatorService','$location','PermissionService', mifosX.controllers.AssignedTicketController]).run(function($log) {
    $log.info("AssignedTicketController initialized");
  });
}(mifosX.controllers || {}));
