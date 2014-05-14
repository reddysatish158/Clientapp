(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewOfficeController: function(scope, routeParams , resourceFactory ,PermissionService) {
        scope.charges = [];
        scope.PermissionService = PermissionService;
    	scope.officeFinanceTrans=[];

        resourceFactory.officeResource.get({officeId: routeParams.id} , function(data) {
            scope.office = data;
            rootScope.office_name = scope.office.name;
        });
        
      //for office finance Transactions
        resourceFactory.officeFinancialTransactionResource.get({officeId:routeParams.id},function(data){
      	  scope.officeFinanceTrans = data;
        });
    }
  });
  mifosX.ng.application.controller('ViewOfficeController', ['$scope', '$routeParams','ResourceFactory','PermissionService', mifosX.controllers.ViewOfficeController]).run(function($log) {

    $log.info("ViewOfficeController initialized");
  });
}(mifosX.controllers || {}));
