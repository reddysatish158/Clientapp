(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentGatewayController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService) {
        scope.paymentgatewaydatas = [];
        resourceFactory.paymentGatewayResource.get(function(data) {
        	 scope.paymentgatewaydatas=data; 
        });
    }
  });
  mifosX.ng.application.controller('PaymentGatewayController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.PaymentGatewayController]).run(function($log) {
    $log.info("PaymentGatewayController initialized");
  });
}(mifosX.controllers || {}));


