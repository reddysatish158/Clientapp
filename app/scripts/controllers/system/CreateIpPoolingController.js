(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateIpPoolingController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,$rootScope) {
       
        scope.formData = {};
        scope.ipTypes=[];
        resourceFactory.ipPoolingTemplateResource.get(function(data) {
            
        	scope.ipTypes = data.codeValueDatas;
                    
        });
      
        scope.submit = function() {
			resourceFactory.ipPoolingResource.save(this.formData, function(data) {
						location.path('/ipPooling');
					});
		};
    }
  });
  mifosX.ng.application.controller('CreateIpPoolingController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter','API_VERSION','$rootScope', mifosX.controllers.CreateIpPoolingController]).run(function($log) {
    $log.info("CreateIpPoolingController initialized");
  });
}(mifosX.controllers || {}));
