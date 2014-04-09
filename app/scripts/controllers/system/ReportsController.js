(function(module) {
  mifosX.controllers = _.extend(module, {
    ReportsController: function(scope, resourceFactory,location,PermissionService,PaginatorService) {
        scope.reports = [];
        scope.PermissionService = PermissionService;
        
        scope.search123 = function(offset, limit, callback) {
            resourceFactory.reportsResource.getReport({offset: offset, limit: limit , sqlSearch: scope.filterText } , callback); 
           };
         
         scope.search = function(filterText) {
        	 scope.reports = PaginatorService.paginate(scope.search123, 14);
         };
         
        scope.fetchReports = function(offset, limit, callback) {
        	resourceFactory.reportsResource.getReport({offset: offset, limit: limit} , callback);
        };
        
        scope.reports = PaginatorService.paginate(scope.fetchReports, 14);
        
        scope.routeToreport = function(id){
            location.path('/system/viewreport/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('ReportsController', ['$scope', 'ResourceFactory','$location','PermissionService','PaginatorService', mifosX.controllers.ReportsController]).run(function($log) {
    $log.info("ReportsController initialized");
  });
}(mifosX.controllers || {}));
