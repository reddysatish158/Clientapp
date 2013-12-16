(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewImportController: function(scope, routeParams , location,resourceFactory ) {
        scope.import = [];
        resourceFactory.importviewResource.get({uploadfileId: routeParams.id}, function(data) {
            scope.import = data;
           
        });

        scope.deleteuser = function (){
            resourceFactory.importviewResource.get({uploadfileId: routeParams.id} , {} , function(data) {
                  location.path('/importing');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
          
          
          scope.processFile = function (){
              resourceFactory.importProcessResource.update({uploadfileId: routeParams.id} , {} , function(data) {
            	   location.path('/importing');
                    // added dummy request param because Content-Type header gets removed 
                    // if the request does not contain any data (a request body)        
              });
            }; 
            
            scope.downloadFile = function (){ 
            
           	/* fileDownload("https://localhost:7070/mifosng-provider/api/v1/uploadstatus/"+routeParams.id+"/print?tenantIdentifier=default", {
                 //preparingMessageHtml: "Please wait while your document is downloaded...",
                 //failMessageHtml: "There was a problem downloading the document, please try again.",
                 httpMethod: "GET"*/
            	//scope.$broadcast("downloadFile",'https://localhost:7070/mifosng-provider/api/v1/uploadstatus/'+routeParams.id+'/print?tenantIdentifier=default');
            	  window.open('https://localhost:9554/obsplatform/api/v1/uploadstatus/'+routeParams.id+'/print?tenantIdentifier=default');
            // });
};
           
    }
  });
  mifosX.ng.application.controller('ViewImportController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.ViewImportController]).run(function($log) {
    $log.info("ViewImportController initialized");
  });
}(mifosX.controllers || {}));
