(function(module) {
  mifosX.controllers = _.extend(module, {
	  OrderController: function(scope,webStorage,routeParams, resourceFactory,location) {
        scope.orderPriceDatas = [];
        scope.orderHistorydata=[];
        scope.orderData=[];
        scope.redata={};
        scope.formData=[];
        var orderId=routeParams.id;
         scope.clientId=routeParams.clientId;
         var clientData = webStorage.get('clientData');
         scope.displayName=clientData.displayName;
         scope.statusActive=clientData.statusActive;
         scope.accountNo=clientData.accountNo;
         scope.officeName=clientData.officeName;
         scope.balanceAmount=clientData.balanceAmount;
         scope.currency=clientData.currency;
         scope.imagePresent=clientData.imagePresent;
         
        resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
            scope.orderPriceDatas= data.orderPriceData;
            scope.orderHistorydata=data.orderHistory;
            scope.orderData=data.orderData;
          
        });
        
        resourceFactory.associationResource.getAssociation({clientId: routeParams.clientId,id:routeParams.id} , function(data) {
            scope.association = data;                                                
        });
                
        
        
        scope.retrack = function (){
        	scope.redata.message='retrack';
        	//alert(routeParams.id);
        	 resourceFactory.osdResource.getPost({'id': 1 , 'orderId': routeParams.id} , function(data) {
                 location.path('/vieworder/'+routeParams.id);           	
            });
        };
        
        scope.deAssociation=function (){
        	
        	 resourceFactory.deAssociationResource.update({id:scope.association.id} , function(data) {
                 location.path('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);           	
            });
        };
        	
        
        scope.reconnect = function (){
          
            resourceFactory.OrderreconnectResource.update({orderId: routeParams.id} ,this.formData, function(data) {
            	
                 location.path('/viewclient/'+scope.orderPriceDatas[0].clientId);
             	
            	
            });
          };
          
          scope.cancel=function(){

        	  resourceFactory.saveOrderResource.delete({clientId: routeParams.id} , {} , function(data) {
        		  
        		    location.path('/viewclient/'+scope.orderPriceDatas[0].clientId);
                        
                  });
          };
          scope.updatePrice = function (id,price){
        	  scope.orderData.locale="en";
        	  scope.orderData.price=price;
        	  scope.orderData.priceId=id;
        	
              resourceFactory.getSingleOrderResource.update({orderId: routeParams.id} ,scope.orderData, function(data) {
                 
            	  //location.path('/vieworder/'+data.resourceId);
            	
              });
        
            };
    }
  
  
  });
  
 
  
  mifosX.ng.application.controller('OrderController', ['$scope','webStorage','$routeParams', 'ResourceFactory','$location', mifosX.controllers.OrderController]).run(function($log) {
    $log.info("OrderController initialized");
  });
}(mifosX.controllers || {}));
