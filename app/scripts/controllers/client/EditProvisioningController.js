(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditProvisioningController: function(scope, webStorage,resourceFactory, routeParams,location,dateFilter) {
        scope.provisioningdata= [];
        scope.services= [];
        scope.ipPoolDatas=[];
        scope.vlanDatas=[];
        scope.formData={};
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
       resourceFactory.provisioningtemplateDataResource.get({orderId: routeParams.orderId} , function(data) {
    	   scope.parameterDatas=data.parameterDatas;
    	   scope.provisioningdata=data;
    	   scope.services=data.services;
    	   scope.ipPoolDatas=data.ipPoolDatas;
    	   scope.vlanDatas=data.vlanDatas;
    	   
    	   for(var param in scope.parameterDatas){
       		

     		  var temp = {};
     		  temp.paramName = scope.parameterDatas[param].paramName;
     		  temp.paramValue = scope.parameterDatas[param].paramValue;
     		if(temp.paramName == "SERVICE"){
     			
     			scope.formData.serviceName=temp.paramValue;
     			
     		}else if(temp.paramName == "GROUP_NAME"){
                   
     			scope.formData.groupName=temp.paramValue;
                 //delete this.formData.groupName;
                 
     		}else if(temp.paramName == "IP_ADDRESS"){
     			
                 scope.formData.ipAddress=temp.paramValue;
                 
     		}else if(temp.paramName == "VLAN_ID"){
     			
                 scope.formData.vLan=temp.paramValue;
                 
     		}
     		
     		
     	}
                
            });
        	
        scope.submit = function() {
        	
        	scope.serviceParameters=[];
        	this.formData.clientId=scope.clientId;
        	this.formData.orderId=routeParams.orderId;
        	this.formData.planName=scope.planName;
        	this.formData.macId=scope.device;
        	
        	for(var param in scope.parameterDatas){
        		

        		  var temp = {};
        		  temp.paramName = scope.parameterDatas[param].paramName;
        		  
        		if(temp.paramName == "SERVICE"){
        			
                    temp.paramValue = scope.parameterDatas[param].paramValue;
        			
        		}else if(temp.paramName == "GROUP_NAME"){
                    
        			temp.paramValue = this.formData.groupName;
                    delete this.formData.groupName;
                    
        		}else if(temp.paramName == "IP_ADDRESS"){
        			
                    temp.paramValue = this.formData.ipAddress;
                    delete this.formData.ipAddress;
                    
        		}else if(temp.paramName == "VLAN_ID"){
        			
                    temp.paramValue = this.formData.vLan;
                    delete this.formData.vLan;
        		}
        		
        		  scope.serviceParameters.push(temp);
        	}
        	   this.formData.serviceParameters = scope.serviceParameters;
           
           resourceFactory.provisioningserviceResource.update({'orderId':routeParams.orderId},this.formData,function(data){
        	   location.path('/vieworder/' +routeParams.orderId+'/'+scope.clientId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditProvisioningController', ['$scope','webStorage', 'ResourceFactory','$routeParams', '$location','dateFilter', mifosX.controllers.EditProvisioningController]).run(function($log) {
    $log.info("CreateMediaController initialized");
  });
}(mifosX.controllers || {}));
