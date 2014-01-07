(function(module) {
  mifosX.controllers = _.extend(module, {
    AccountingRuleController: function(scope, resourceFactory,location) {

		resourceFactory.accountingRulesResource.get(function(data){
			scope.rules = data;
		});
		scope.routeTo = function(id){
            location.path('/viewaccrule/'+ id);
          };

    }
  });
  mifosX.ng.application.controller('AccountingRuleController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.AccountingRuleController]).run(function($log) {
    $log.info("AccountingRuleController initialized");
  });
}(mifosX.controllers || {}));