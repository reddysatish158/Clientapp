(function(module) {
  mifosX.controllers = _.extend(module, {
	  PriceController: function(scope,routeParams, resourceFactory,location) {
        scope.prices = [];
        scope.planId=routeParams.id;
        
        scope.routeTo = function(priceId,planId){
            location.path('/viewprice/'+priceId+"/"+planId);
         };
         
        resourceFactory.priceResource.get({planId: routeParams.id, template: 'true'} , function(data) {
            scope.prices= data.serviceData;
        });
    }
  });
  mifosX.ng.application.controller('PriceController', ['$scope', '$routeParams','ResourceFactory', '$location', mifosX.controllers.PriceController]).run(function($log) {
    $log.info("PriceController initialized");
  });
}(mifosX.controllers || {}));
