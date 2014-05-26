(function(module) {
    mifosX.controllers = _.extend(module, {
        CodeController: function(scope, resourceFactory,location,PermissionService) {
            scope.codes = [];
            scope.PermissionService = PermissionService;
           if(PermissionService.showMenu('READ_CODE')){
        	   resourceFactory.codeResources.getAllCodes(function(data){
        		   scope.codes = data;
        	   });
           }
            scope.routeTo = function(id){
            	if(PermissionService.showMenu('READ_CODEVALUE'))
            		location.path('/viewcode/'+ id);
              };
       }
     });
    mifosX.ng.application.controller('CodeController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.CodeController]).run(function($log) {
        $log.info("CodeController initialized");
    });
}(mifosX.controllers || {}));
