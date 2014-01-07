(function(module) {
  mifosX.controllers = _.extend(module, {
	  OrderController: function(scope,webStorage,routeParams, resourceFactory,location,$modal,dateFilter,paginatorService) {
        scope.orderPriceDatas = [];
        scope.orderHistorydata=[];
        scope.orderData=[];
        scope.redata={};
        scope.formData=[];
        scope.provisioning={};
        scope.commandData = [];
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
            scope.orderServicesData=data.orderServices;
            scope.orderDiscountDatas=data.orderDiscountDatas;
          
        });
       
        
        resourceFactory.associationResource.getAssociation({clientId: routeParams.clientId,id:routeParams.id} , function(data) {
            scope.association = data;
            if(data.orderId){
            	scope.flag=true;
            }else{
            	scope.flag=false;
            }
        });
        
        scope.reconnect = function (){
        	scope.errorStatus=[];scope.errorDetails=[];
        	 $modal.open({
                 templateUrl: 'ApproveReconnect.html',
                 controller: ApproveReconnect,
                 resolve:{}
             });
          };
          
          scope.orderDisconnect = function(orderDisUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $modal.open({
                  templateUrl: 'OrderDisconnect.html',
                  controller: OrderDisconnectController,
                  resolve:{}
              });
          };
          
          scope.orderRenew = function(orderRenewUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $modal.open({
        		  templateUrl: 'OrderRenewal.html',
        		  controller: OrderRenewalController,
        		  resolve:{}
        	  });
          };
          
          scope.CommandCenter = function(CommandCenterUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
          	  $modal.open({
                  templateUrl: 'ProvisioningSystemPop.html',
                  controller: ProvisioningSystemPopController,
                  resolve:{}
              });
          	
          };
          
     var ProvisioningSystemPopController = function($scope,$modalInstance){
         	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
         		 $('#commandName').hide();
         		 $scope.commandData=data; 
             });
         	 
          	$scope.acceptProvisioning = function(){
          		if(this.provisioning == undefined || this.provisioning == null){
              		this.provisioning = {};
              	} 		
          		if(this.formData.commandname.commandName=='OSM'){
          			  this.provisioning.commandName=this.formData.commandname.commandName;
          			  this.provisioning.message=this.formData.message;
        				resourceFactory.osdResource.save({'orderId': routeParams.id},this.provisioning,
        						function(data) {
        					 location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
        					 $modalInstance.close('delete');
        				     },function(renewalErrorData){
            	         	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
            						});
          		}
          		else{
          		    this.provisioning.commandName=this.formData.commandname.commandName;
          			resourceFactory.osdResource.getPost({'orderId': routeParams.id} ,this.provisioning, function(data) {
                        location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                        $modalInstance.close('delete');           
          			 },function(renewalErrorData){
         	        	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
         						});
          		}
          		  
          	};
          	
          	$scope.commandName=function(name){
          		if(this.formData.commandname.commandName=='OSM'){
          			$('#commandName').show();
          		}else{
          			$('#commandName').hide();
          		}
          		
          	};
          	
          	$scope.rejectProvisioning = function(){
          		$modalInstance.dismiss('cancel');
          	};
          };
          
    	var ApproveReconnect = function ($scope, $modalInstance) {
            $scope.approveReconnect = function () {
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	resourceFactory.OrderreconnectResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
                    $modalInstance.close('delete');
                });
            	
            };
            $scope.cancelReconnect = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        

          
          var OrderRenewalController = function($scope,$modalInstance){
        	  $scope.subscriptiondatas = [];
        	  resourceFactory.OrderrenewalResourceTemplate.get(function(data) {
                  $scope.subscriptiondatas = data.subscriptiondata;
              });
        	  
        	  $scope.approveRenewal = function(){
        		  
        		  if($scope.formData == undefined || $scope.formData == null){
        			  $scope.formData = {"renewalPeriod":"","description":""};
        		  }
        		  
        		  resourceFactory.OrderrenewalResource.save({'orderId': routeParams.id},this.formData,function(data){
        	            //location.path('/vieworder/'+data.resourceId);
        	            
        	            resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
        	            scope.orderPriceDatas= data.orderPriceData;
        	            scope.orderHistorydata=data.orderHistory;
        	            scope.orderData=data.orderData;
        	            });
        	             
        	            $modalInstance.close('delete');
        	            
        	        },function(renewalErrorData){
        	        	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
        	        });
        	  };
        	  $scope.cancelRenewal = function(){
        		  console.log('cancel renewal');
        		  $modalInstance.dismiss('cancel');
        	  };
          };
          
          
          var OrderDisconnectController = function ($scope, $modalInstance) {
              
        	  $scope.disconnectDetails = [];
        	  $scope.start = {};
        	  $scope.start.date = new Date();
              resourceFactory.OrderDisconnectResource.get(function(data) {
                  $scope.disconnectDetails = data.disconnectDetails;
              });
        	  console.log($scope.disconnectDetails);
        	  
        	  $scope.approveDisconnection = function () {
        		  if(this.formData == undefined || this.formData == null){
        			  this.formData = {"disconnectReason":""};
        		  }
        		  
        		  var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
        	        this.formData.dateFormat = 'dd MMMM yyyy';
        	        this.formData.disconnectionDate = reqDate;
        	        this.formData.locale = "en";
        		  
        		  resourceFactory.saveOrderResource.update({'clientId': routeParams.id},this.formData,function(data){
        	            /*location.path('/viewclient/'+scope.orderPriceDatas[0].clientId);
        	            location.path('/vieworder/'+data.resourceId);*/
        			  	
        			  resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
        		            scope.orderPriceDatas= data.orderPriceData;
        		            scope.orderHistorydata=data.orderHistory;
        		            scope.orderData=data.orderData;
        		        });
        			    console.log(data.resourceId);
        	            $modalInstance.close('delete');
        	        },function(orderErrorData){
        	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
        	        });
        		  
              };
              $scope.cancelDisconnection = function () {
                  $modalInstance.dismiss('cancel');
              };
              
              
          };
          
        
        
        scope.deAssociation=function (){
        	 resourceFactory.deAssociationResource.update({id:scope.association.id} , function(data) {
        		 console.log('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);
                 location.path('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);           	
            });
        };

          scope.updatePrice = function (id,price){
        	  scope.orderData.locale="en";
        	  scope.orderData.price=price;
        	  scope.orderData.priceId=id;
        	
              resourceFactory.getSingleOrderResource.update({orderId: routeParams.id} ,scope.orderData, function(data) {
                 
            	  //location.path('/vieworder/'+data.resourceId);
            	
              },function(error){
            	  scope.errorStatus=[];scope.errorDetails=[];
              });
        
            };
    }
  
  
  });
  
 
  
  mifosX.ng.application.controller('OrderController', ['$scope','webStorage','$routeParams', 'ResourceFactory','$location','$modal','dateFilter','PaginatorService',mifosX.controllers.OrderController]).run(function($log) {
    $log.info("OrderController initialized");
  });
}(mifosX.controllers || {}));
