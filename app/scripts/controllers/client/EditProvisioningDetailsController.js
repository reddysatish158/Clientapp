(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditProvisioningDetailsController: function(scope, webStorage,resourceFactory, routeParams,location,dateFilter) {
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
    
       resourceFactory.provisioningtemplateDataResource.get({orderId: routeParams.id} , function(data) {
    	   
    	   scope.parameterDatas=data.parameterDatas;
    	   scope.provisioningdata=data;
    	   scope.services=data.services;
    	   scope.ipPoolDatas=data.ipPoolDatas;
    	   scope.vlanDatas=data.vlanDatas;
    	   
    	for(var param in scope.parameterDatas){
    		

    		  var temp = {};
    		 
    		  
    		if(scope.parameterDatas[param].paramName == "SERVICE"){
    			
    			 temp.paramName = scope.parameterDatas[param].paramName;
                temp.paramValue = scope.parameterDatas[param].paramValue;
               // scope.serviceParameters.push(temp);
    		}else if(scope.parameterDatas[param].paramName == "GROUP_NAME"){
    			
    			 temp.paramName = scope.parameterDatas[param].paramName;
    			//temp.paramValue = this.formData.groupName;
    			//scope.serviceParameters.push(temp);
               // delete this.formData.groupName;
                
    		}else if(scope.parameterDatas[param].paramName == "VLAN_ID"){
    			
    			 temp.paramName = scope.parameterDatas[param].paramName;
                scope.formData.vLan=scope.parameterDatas[param].paramValue;
                alert(scope.formData.vLan);
                alert("scope.parameterDatas[param].paramValue"+scope.parameterDatas[param].paramValue);
                //delete this.formData.vLan;
                
    		}else if(scope.parameterDatas[param].paramName == "IP_ADDRESS"){
    			 temp.paramName = scope.parameterDatas[param].paramName;
    			var ipval="";
    			for(var param in scope.addIpAddress){
            		
            		if(ipval!=""){
            			ipval= ipval+",";
            			
            		}
            		ipval= ipval+scope.addIpAddress[param].ipvalue;
            		temp.paramValue =ipval;
            		
            	}
    			//scope.serviceParameters.push(temp);
               // delete this.formData.ipAddress;
                
    		}
    		
    		  
    	}
                
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
   		    scope.addIpAddress.push({
   			ipvalue : scope.formData.ipAddress
   		});

   		scope.formData.ipAddress = undefined;

   	};
   	
   	scope.deleteAddIpAddress = function(index) {
   		scope.addIpAddress.splice(index, 1);
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
                    scope.formData.vLan=scope.parameterDatas[param].paramValue;
                    alert(scope.formData.vLan);
                    alert("scope.parameterDatas[param].paramValue"+scope.parameterDatas[param].paramValue);
                    //delete this.formData.vLan;
                    
        		}else if(scope.parameterDatas[param].paramName == "IP_ADDRESS"){
        			 temp.paramName = scope.parameterDatas[param].paramName;
        			var ipval="";
        			for(var param in scope.addIpAddress){
                		
                		if(ipval!=""){
                			ipval= ipval+",";
                			
                		}
                		ipval= ipval+scope.addIpAddress[param].ipvalue;
                		temp.paramValue =ipval;
                		
                	}
        			scope.serviceParameters.push(temp);
                   // delete this.formData.ipAddress;
                    
        		}
        		
        		  
        	}
        	   this.formData.serviceParameters = scope.serviceParameters;
        	   
        	   resourceFactory.provisioningserviceResource.update({'orderId':routeParams.id},this.formData,function(data){
            	   location.path('/vieworder/' +routeParams.id+'/'+scope.clientId);
              });
        };
    }
  });
  mifosX.ng.application.controller('EditProvisioningDetailsController', ['$scope','webStorage', 'ResourceFactory','$routeParams', '$location','dateFilter', mifosX.controllers.EditProvisioningDetailsController]).run(function($log) {
    $log.info("EditProvisioningDetailsController initialized");
  });
}(mifosX.controllers || {}));
