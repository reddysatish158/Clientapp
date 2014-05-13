(function(module) {
  mifosX.controllers = _.extend(module, {
	  CurrencyDetailsController: function(scope, resourceFactory,location,PermissionService) {
        scope.currencydetails = [];
        scope.PermissionService = PermissionService;
        resourceFactory.currencyResource.getCurrency(function(data) {
            scope.currencydetails = data;
        }); 
        scope.routeTo = function(id){
            location.path('/viewcurrencydetails/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('CurrencyDetailsController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.CurrencyDetailsController]).run(function($log) {
    $log.info("CurrencyDetailsController initialized");
  });
}(mifosX.controllers || {}));
