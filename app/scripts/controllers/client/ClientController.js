(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientController: function(scope, resourceFactory , paginatorService,location,PermissionService) {
        
      scope.clients = [];
      scope.PermissionService = PermissionService;
     
      var fetchFunction = function(offset, limit, callback) {
        resourceFactory.clientResource.getAllClients({offset: offset, limit: limit} , callback);
      };
      
      scope.routeTo = function(id){
          location.path('/viewclient/'+ id);
        };
        
    	scope.routeToGroup = function(name){
            location.path('/viewgroupdetails/'+ name);
       };
       
      if(PermissionService.showMenu('READ_CLIENT'))
    	  scope.clients = paginatorService.paginate(fetchFunction, 14);
      
      
      
      scope.search123 = function(offset, limit, callback) {
          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit , sqlSearch: scope.filterText } , callback); 
         };
       
       scope.search = function(filterText) {
        scope.clients = paginatorService.paginate(scope.search123, 14);
       }
    }
  });
  mifosX.ng.application.controller('ClientController', ['$scope', 'ResourceFactory', 'PaginatorService','$location','PermissionService',mifosX.controllers.ClientController]).run(function($log) {
    $log.info("ClientController initialized");
  });
}(mifosX.controllers || {}));
