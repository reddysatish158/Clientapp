(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPromotioncodeController: function(scope, routeParams , location, resourceFactory,webStorage) {
		 
        scope.promotiondata = [];              
        resourceFactory.promotionResource.getPrmotioncodeDetails({promotioncodeId: routeParams.id} , function(data) {
            scope.promotiondata = data;                                                
        });
      scope.deletePromotion = function (){
            resourceFactory.promotionResource.delete({promotioncodeId: routeParams.id} , {} , function(data) {
            	 webStorage.add("callingTab", {someString: "Promotioncode" });
                  location.path('/discounts');
                 
                 
            });
          };
      scope.changeToSameTab = function(){
    	  webStorage.add("callingTab", {someString: "Promotioncode" });
      }
    }
  });
  mifosX.ng.application.controller('ViewPromotioncodeController', ['$scope', '$routeParams', '$location', 'ResourceFactory','webStorage', mifosX.controllers.ViewPromotioncodeController]).run(function($log) {
    $log.info("ViewPromotioncodeController initialized");
  });
}(mifosX.controllers || {}));