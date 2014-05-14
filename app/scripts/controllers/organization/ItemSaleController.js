(function(module) {
  mifosX.controllers = _.extend(module, {
	  ItemSaleController: function(scope, resourceFactory, location,dateFilter,routeParams) {
		  
		   scope.officeId = routeParams.officeId;
    	   scope.officeDatas = [];
    	   scope.itemDatas = [];
    	   scope.purchase = {};
    	   scope.purchase.date = new Date();
    	   scope.formData={};
    	   scope.data={};
        resourceFactory.itemSaleTemplateResource.get(function(data) {
        	 scope.officeDatas = data.officeDatas;
        	 scope.itemDatas = data.itemDatas;
        });
        
        scope.itemData=function(itemId){
        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
        		delete scope.formData.quantity;
        		delete scope.formData.itemPrice;
        		scope.formData.itemId=itemId;
        		scope.unitPrice = data.unitPrice;
	        });	
        };
        scope.itemDataQuantity=function(quantity,itemId){
        	delete scope.formData.itemPrice;
        	scope.data.unitPrice=scope.unitPrice;
        	scope.data.locale="en";
        	scope.data.quantity=quantity;
        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},scope.data, function(data) {
        		
        		scope.formData.itemId=itemId;
        		scope.formData.chargeAmount = data.totalPrice;
	        });	
        };
     
        scope.submit = function() {
        	
        	scope.formData.locale = 'en';
           	var reqDate = dateFilter(scope.purchase.date,'dd MMMM yyyy');
            scope.formData.dateFormat = 'dd MMMM yyyy';
            scope.formData.purchaseDate = reqDate;


            resourceFactory.itemSaleResource.save(scope.formData,function(data){
//        	location.path('/viewmrn/'+data.resourceId);
        	location.path('/viewoffice/'+routeParams.officeId);

            /*resourceFactory.agentsResource.postAgent(scope.formData,function(data){
        		location.path('/viewoffice/'+routeParams.officeId);*/

          });
        };
    }
  });
  mifosX.ng.application.controller('ItemSaleController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams', mifosX.controllers.ItemSaleController]).run(function($log) {
    $log.info("ItemSaleController initialized");
  });
}(mifosX.controllers || {}));
