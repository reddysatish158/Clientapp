(function(module) {
  mifosX.controllers = _.extend(module, {
	  ItemSaleController: function(scope,webStorage, resourceFactory, location,dateFilter,$rootScope) {
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
        		scope.formData.quantity=quantity;
        		scope.formData.itemId=itemId;
        		scope.formData.itemPrice = data.totalPrice;
	        });	
        };
     
        scope.selectedMRN=function(){
        	webStorage.add("callingTab", {someString: "mrn" });
        };
        scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "mrn" });
	       };
        scope.submit = function() {
        	
        	scope.formData.locale = 'en';
           	var reqDate = dateFilter(scope.purchase.date,'dd MMMM yyyy');
            scope.formData.dateFormat = 'dd MMMM yyyy';
            scope.formData.purchase_date = reqDate;

            /*resourceFactory.mrnResource.save(scope.formData,function(data){
        		//location.path('/viewmrn/'+data.resourceId);
          });*/
        };
    }
  });
  mifosX.ng.application.controller('ItemSaleController', ['$scope','webStorage', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.ItemSaleController]).run(function($log) {
    $log.info("ItemSaleController initialized");
  });
}(mifosX.controllers || {}));
