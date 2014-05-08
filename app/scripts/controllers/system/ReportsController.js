(function(module) {
  mifosX.controllers = _.extend(module, {
    ReportsController: function(scope,PaginatorService, resourceFactory,location) {
        scope.reports = [];
        /*resourceFactory.reportsResource.getReport(function(data) {
            scope.reports = data;
        });*/
        
        scope.search123 = function(offset, limit, callback) {
            resourceFactory.reportsResource.getReport({offset: offset, limit: limit , sqlSearch: scope.filterText } , callback); 
           };
         
         scope.search = function(filterText) {
        	 scope.reports = PaginatorService.paginate(scope.search123, 14);
        	 alert(reports.id);
         };
         
        scope.fetchReports = function(offset, limit, callback) {
        	resourceFactory.reportsResource.getReport({offset: offset, limit: limit} , callback);
        };
        
        scope.reports = PaginatorService.paginate(scope.fetchReports, 14);
        
        scope.routeToreport = function(id){
        	alert(id);
        	location.path('/system/viewreport/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('ReportsController', ['$scope','PaginatorService', 'ResourceFactory','$location', mifosX.controllers.ReportsController]).run(function($log) {
    $log.info("ReportsController initialized");
  });
}(mifosX.controllers || {}));
