(function(module) {
  mifosX.controllers = _.extend(module, {
	  MappingController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService) {
        scope.servicemappingdatas = [];
        scope.hardwaremappingdatas= [];
        scope.provisiongsystemData= [];
        
        var callingTab = webStorage.get('callingTab',null);
        if(callingTab == null){
        	callingTab="";
        }else{
		  scope.displayTab=callingTab.someString;
		 
		  if( scope.displayTab == "hardwarePlanMapping"){
			 
			  scope.hardwarePlanMappingTab =  true;
			  webStorage.remove('callingTab');
		  }else
		  {
			  webStorage.remove('callingTab');
		  };
		 
        }
        
        resourceFactory.mappingResource.get(function(data) {
        	 scope.servicemappingdatas=data; 
        });
     
        scope.getHardwareMappingData=function(data){
        	
        	resourceFactory.hardwareMappingResource.get(function(data) {
           	 scope.hardwaremappingdatas=data; 
           });
        	
        };
        
	scope.getEventActionMappingData=function(data){
        	
        	resourceFactory.EventActionMappingResource.get(function(data) {
           	 scope.datas=data; 
           });
        	
        };
        
        scope.getProvisiongCommandData=function(data){
          	 
          	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
              	 scope.provisiongsystemData=data; 
              });
          };
          scope.routeToservice = function(id){
              location.path('/viewServiceMapping/'+ id);
            };
         scope.routeTohardware = function(id){
             location.path('/viewhardwareplanmapping/'+ id);
          };
          scope.routeToprovisioning = function(id){
              location.path('/viewprovisioningmapping/'+ id);
           };
    }
  });
  mifosX.ng.application.controller('MappingController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.MappingController]).run(function($log) {
    $log.info("MappingController initialized");
  });
}(mifosX.controllers || {}));


