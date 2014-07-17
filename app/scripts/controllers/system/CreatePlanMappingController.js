(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreatePlanMappingController: function(scope, resourceFactory, location) {
        scope.planCodes = [];
        scope.statusDatas=[];
        
        resourceFactory.planMappingtemplateResource.getAllPlanMapping(function(data) {
           
        	scope.planCodes = data.planCodeData;
            scope.statusDatas=data.status;
          
        
        });
        scope.submit = function() {
            resourceFactory.planMappingResource.save(this.formData,function(data){
            		location.path('/viewplanmapping/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreatePlanMappingController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreatePlanMappingController]).run(function($log) {
    $log.info("CreatePlanMappingController initialized");
  });
}(mifosX.controllers || {}));
