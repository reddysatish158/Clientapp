(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateProvisioningController: function(scope, webStorage,resourceFactory, routeParams,location,dateFilter) {
        scope.provisioningdata= [];
        scope.services= [];
        scope.ipPoolDatas=[];
        scope.vlanDatas=[];
        scope.formData={};
        scope.formData.addIpAddress = [];
        
        var clientData = webStorage.get('clientData');
        var orderData = webStorage.get('orderData');
        scope.statusActive=clientData.statusActive;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.clientId=clientData.clientId;
        scope.phone=clientData.phone;
        scope.device=clientData.hwSerialNumber;
        scope.displayName=clientData.displayName;
        scope.planName=orderData.planName;
        scope.formData.groupName=orderData.groupName;
        scope.orderNo=orderData.orderNo;
        scope.parameterDatas=[];
        scope.serviceParameters=[];
       resourceFactory.provisioningCreatetemplateDataResource.get({orderId: routeParams.orderId} , function(data) {
    	   scope.parameterDatas=data.parameterDatas;
    	   scope.provisioningdata=data;
    	   scope.services=data.services;
    	   scope.ipPoolDatas=data.ipPoolDatas;
    	   scope.vlanDatas=data.vlanDatas;
                
            });
       
       
       scope.getData = function(query){
          	if(query.length>0){
          		resourceFactory.ippoolingDetailsResource.getIpAddress({query: query}, function(data) { 
          		alert(data.ipAddressData);			
   	            scope.ipPoolDatasData = data.ipAddressData;
   	        });
          	}else{
              	
          	}
          }
          
          scope.addIpAddresses = function() {	
   		    scope.formData.addIpAddress.push({
   			ipvalue : scope.formData.ipAddress
   		});

   		scope.formData.ipAddress = undefined;

   	};
   	
   	scope.deleteAddIpAddress = function(index) {
   		scope.formData.addIpAddress.splice(index, 1);
   	};
   	
   	
        	
        scope.submit = function() {
        	this.formData.clientId=scope.clientId;
        	this.formData.orderId=routeParams.orderId;
        	this.formData.planName=scope.planName;
        	this.formData.macId=scope.device;
        	//delete this.formData.addIpAddress;
        	
        	
        	
        	for(var param in scope.parameterDatas){
        		

        		  var temp = {};
        		  temp.paramName = scope.parameterDatas[param].paramName;
        		  
        		if(temp.paramName == "SERVICE"){
        			
                    temp.paramValue = scope.parameterDatas[param].paramValue;
        			
        		}else if(temp.paramName == "GROUP_NAME"){
         
        			temp.paramValue = this.formData.groupName;
                    delete this.formData.groupName;
                    
        		}else if(temp.paramName == "IP_ADDRESS"){
        			var ipval="";
        			for(var param in scope.formData.addIpAddress){
                		
                		if(ipval!=""){
                			ipval= ipval+",";
                			
                		}
                		ipval= ipval+scope.formData.addIpAddress[param].ipvalue;
                		temp.paramValue =ipval;
                	}
        			
                    delete this.formData.ipAddress;
                    
        		}else if(temp.paramName == "VLAN_ID"){
        			
                    temp.paramValue = this.formData.vLan;
                    delete this.formData.vLan;
        		}
        		
        		  scope.serviceParameters.push(temp);
        	}
        	   this.formData.serviceParameters = scope.serviceParameters;
        	   delete this.formData.addIpAddress;
        	   
           resourceFactory.provisioningResource.save({'clientId': scope.clientId},this.formData,function(data){
        	   location.path('/vieworder/' +routeParams.orderId+'/'+scope.clientId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateProvisioningController', ['$scope','webStorage', 'ResourceFactory','$routeParams', '$location','dateFilter', mifosX.controllers.CreateProvisioningController]).run(function($log) {
    $log.info("CreateMediaController initialized");
  });
}(mifosX.controllers || {}));
