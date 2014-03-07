
(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewSchedulerJobHistoryController: function(scope, resourceFactory , paginatorService, routeParams,$rootScope) {
        scope.jobhistory = [];
        var fetchFunction = function(offset, limit, callback) {
          resourceFactory.jobsResource.getJobHistory({jobId : routeParams.id, resourceType : 'runhistory', offset: offset, limit: limit} , callback);
        };
        scope.logFile = function (id){ 
	         //window.open('https://spark.openbillingsystem.com/obsplatform/api/v1/jobs/printlog/'+id+'?tenantIdentifier=default');
	         window.open($rootScope.hostUrl+ API_VERSION +'/jobs/printlog/'+routeParams.id+'?tenantIdentifier=default');
	    };
        scope.jobhistory = paginatorService.paginate(fetchFunction, 14);
    }
  });
  mifosX.ng.application.controller('ViewSchedulerJobHistoryController', ['$scope', 'ResourceFactory', 'PaginatorService', '$routeParams','$rootScope', mifosX.controllers.ViewSchedulerJobHistoryController]).run(function($log) {
    $log.info("ViewSchedulerJobHistoryController initialized");
  });
}(mifosX.controllers || {}));

