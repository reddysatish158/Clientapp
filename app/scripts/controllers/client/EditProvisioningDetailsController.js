(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditProvisioningDetailsController: function(scope,webStorage, routeParams , route, location, resourceFactory,paginatorService, http,$modal,dateFilter,API_VERSION,$rootScope,PermissionService) {
		  var clientData = webStorage.get('clientData');
	        scope.hwSerialNumber=clientData.hwSerialNumber;
	        scope.displayName=clientData.displayName;
	        scope.statusActive=clientData.statusActive;
	        scope.accountNo=clientData.accountNo;
	        scope.officeName=clientData.officeName;
	        scope.balanceAmount=clientData.balanceAmount;
	        scope.currency=clientData.currency;
	        scope.imagePresent=clientData.imagePresent;
	        scope.categoryType=clientData.categoryType;
	        scope.email=clientData.email;
	        scope.phone=clientData.phone;
	        scope.provisioningdata=[];
	       
	        resourceFactory.processRequestResource.get({id: routeParams.id} , function(data) {
	        	scope.provisioningdata=data;
	        	
	        });
	        
	        scope.ContainsMac = function(){
	        	var str1 = "macacd";
	        	/*var str = str1.toLowerCase();
	        	var match = str.match("mac");*/
	        	//return match;
	        	
	        };
	        
	        scope.reset123 = function(){
	      	   webStorage.add("callingTab", {someString: "hardware" });
	         };
	        
	        scope.submit = function() {
	        	
	            resourceFactory.updateProvisioningMappingResource.update({'provisioningId':routeParams.id},{},function(data){
	            	location.path('/viewclient/' +scope.provisioningdata.clientId);
		           
		          });
	            webStorage.add("callingTab", {someString: "hardware" });
	        }; 
    }
  });
  mifosX.ng.application.controller('EditProvisioningDetailsController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', 'PaginatorService','$http','$modal','dateFilter','API_VERSION','$rootScope','PermissionService', mifosX.controllers.EditProvisioningDetailsController]).run(function($log) {
    $log.info("EditProvisioningDetailsController initialized");
  });
}(mifosX.controllers || {}));