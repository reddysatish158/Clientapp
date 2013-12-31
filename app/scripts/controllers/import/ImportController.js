(function(module) {
  mifosX.controllers = _.extend(module, {
	  ImportController: function(scope, resourceFactory,route) {
        scope.imports = [];
        
        
        
        var getAllFiles = function(){
        	resourceFactory.importResource.getAllimportfiles(function(data) {
                scope.imports= data;
            });
        };
        
        getAllFiles();
       
        
        scope.getProcessStatus = function(impprocess){
        	if(impprocess == 'NEW')
        		return true;
        	else
        		return false;
        };
        scope.getLogStatus = function(impprocess){
        	if(impprocess != 'NEW' && impprocess != 'Running...')
        		return true;
        	else
        		return false;
        };
        
        scope.processFile = function (id){    	                   
                resourceFactory.importProcessResource.update({uploadfileId: id} , {} , function(data) {
              	  route.reload();
                },function(errorData){
                	route.reload();
                });
                
                setTimeout("getAllFiles()",3000);
                
        }; 
        
        scope.downloadFile = function (id){ 
            	 window.open('https://localhost:9554/obsplatform/api/v1/uploadstatus/'+id+'/print?tenantIdentifier=default');
        };
             
        scope.logFile = function (id){ 
        		window.open('https://localhost:9554/obsplatform/api/v1/uploadstatus/'+id+'/printlog?tenantIdentifier=default');
        };
    }
  });
  mifosX.ng.application.controller('ImportController', ['$scope', 'ResourceFactory','$route', mifosX.controllers.ImportController]).run(function($log) {
    $log.info("ImportController initialized");
  });
}(mifosX.controllers || {}));
