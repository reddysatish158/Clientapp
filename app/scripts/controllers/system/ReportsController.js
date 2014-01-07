(function(module) {
  mifosX.controllers = _.extend(module, {
    ReportsController: function(scope, resourceFactory,location) {
        scope.reports = [];
        resourceFactory.reportsResource.getReport(function(data) {
            scope.reports = data;
        });
        scope.routeToreport = function(id){
            location.path('/system/viewreport/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('ReportsController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.ReportsController]).run(function($log) {
    $log.info("ReportsController initialized");
  });
}(mifosX.controllers || {}));
