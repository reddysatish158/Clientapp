(function(module) {
  mifosX.controllers = _.extend(module, {
	  DiscountsController: function(scope, resourceFactory,location) {
        scope.discounts = [];
        resourceFactory.discountsResource.getDiscount(function(data) {
            scope.discounts = data;
        });
        scope.routeTo = function(id){
            location.path('/viewdiscounts/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('DiscountsController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.DiscountsController]).run(function($log) {
    $log.info("DiscountsController initialized");
  });
}(mifosX.controllers || {}));
