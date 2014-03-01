(function(module) {
  mifosX.services = _.extend(module, {
	  PermissionService: function(webStorage, httpService, resourceFactory) {
		  
		  this.showMenu = function(){
			  
		  };
	  }
  });
  mifosX.ng.services.service('PermissionService', [
    'webStorage',
    'HttpService',
    'ResourceFactory',
    mifosX.services.PermissionService
  ]).run(function($log) {
    $log.info("PermissionService initialized");
  });
}(mifosX.services || {}));