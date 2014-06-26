(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateProvisioningController: function(scope, webStorage,resourceFactory, routeParams,location,dateFilter) {
        scope.orderId = routeParams.orderId;
		scope.provisioningdata= [];
        scope.services= [];
        scope.ipPoolDatas=[];
        scope.vlanDatas=[];
        scope.formData={};
        scope.addIpAddress = [];
        
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
        scope.ipTypeDatas = ["Single","Multiple"];
        scope.IPAddress = true;
   		scope.subnet = false;
   		scope.formData.ipRange = "ipAddress";
     
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
          			
   	            scope.ipPoolDatasData = data.ipAddressData;
   	        });
          	}else{
              	
          	}
          };
          
          scope.addIpAddresses = function() {
        	if(scope.formData.ipAddress)
   		    scope.addIpAddress.push(scope.formData.ipAddress);
        	
        	if(scope.addIpAddress.length > 1)
        		scope.formData.ipType = "Multiple";
        	else
        		scope.formData.ipType = "Single";
   		scope.formData.ipAddress = undefined;

   	};
   	
   	scope.deleteAddIpAddress = function(index) {
   		scope.addIpAddress.splice(index, 1);
   		
   		if(scope.addIpAddress.length > 1)
    		scope.formData.ipType = "Multiple";
    	else if(scope.addIpAddress.length == 1)
    		scope.formData.ipType = "Single";
    	else
    		delete scope.fromData.ipType ;
   		
   	};
   	scope.selectedIPAddress  = function(data){
   		scope.IPAddress = true;
   		scope.subnet = false;
   		scope.addIpAddress = [];
   		this.formData.ipRange = data;
   		delete this.formData.subnetIPAddress;
		delete scope.formData.subnet;
   	};
   	
	scope.selectedSubnet  = function(data){
   		scope.subnet = true;
   		scope.IPAddress = false;
   		this.formData.ipRange = data;
   		delete scope.addIpAddress;
   	};
   	
        scope.submit = function() {
        	this.formData.clientId=scope.clientId;
        	this.formData.orderId=routeParams.orderId;
        	this.formData.planName=scope.planName;
        	this.formData.macId=scope.device;
        	//delete this.formData.addIpAddress;
        	
        	
        	   scope.serviceParameters=[];
        	for(var param in scope.parameterDatas){
        		

        		  var temp = {};
        		 
        		  
        		if(scope.parameterDatas[param].paramName == "SERVICE"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
                    temp.paramValue = scope.parameterDatas[param].paramValue;
                    scope.serviceParameters.push(temp);
        		}else if(scope.parameterDatas[param].paramName == "GROUP_NAME"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
        			temp.paramValue = this.formData.groupName;
        			scope.serviceParameters.push(temp);
                   // delete this.formData.groupName;
                    
        		}else if(scope.parameterDatas[param].paramName == "VLAN_ID"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
                    temp.paramValue = this.formData.vLan;
                    scope.serviceParameters.push(temp);
                    //delete this.formData.vLan;
                    
        		}else if(scope.parameterDatas[param].paramName == "IP_ADDRESS"){
        			 temp.paramName = scope.parameterDatas[param].paramName;
        			if(scope.subnet){
        				delete scope.addIPAddress;
        				temp.paramValue = this.formData.subnetIPAddress;
        				console.log(this.formData.subnetIPAddress);
        				console.log(temp.paramValue);
        				this.formData.ipType = "Single";
        			}
        			if(scope.IPAddress){
        			 temp.paramValue = scope.addIpAddress;
        			        			 
        			 delete this.formData.subnetIPAddress;
        			 delete scope.formData.subnet;
        			}
        			scope.serviceParameters.push(temp);
                    
        		}
        		  
        	}
        	 delete this.formData.subnetIPAddress;
        	   this.formData.serviceParameters = scope.serviceParameters;
        	   
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
