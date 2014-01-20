(function(module) {
  mifosX.controllers = _.extend(module, {
	  DiscountsController: function(scope, resourceFactory,location,webStorage) {
		  
		
        scope.discounts = [];
        
        resourceFactory.discountsResource.getDiscount(function(data) {
            scope.discounts = data;
        });
        resourceFactory.promotionResource.get(function(data) {
            scope.promotiondatas = data;
        });
        
        var callingTab = webStorage.get('callingTab',null);
        if(callingTab == null){
        	callingTab="";
        }else{
		  scope.displayTab=callingTab.someString;
		 
		  if( scope.displayTab == "Discount"){
			 
			  scope.DicountTab = true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "Promotioncode"){
			 
			  scope.PromotionCodeTab =  true;
			  webStorage.remove('callingTab');
		  }
        
        scope.getDicounts=function(){
        	resourceFactory.discountsResource.getDiscount(function(data) {
                scope.discounts = data;
            });
        	
        };
        scope.getPromotionCodes=function(){
        	resourceFactory.promotionResource.get(function(data) {
                scope.promotiondatas = data;
            });
        	
        };
        
        }
        
        scope.routeTo = function(id){
            location.path('/viewdiscounts/'+ id);
          };
	  }
  });
  mifosX.ng.application.controller('DiscountsController', ['$scope', 'ResourceFactory','$location','webStorage', mifosX.controllers.DiscountsController]).run(function($log) {
    $log.info("DiscountsController initialized");
  });
}(mifosX.controllers || {}));
