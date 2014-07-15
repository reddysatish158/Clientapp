(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditPlanMappingController: function(scope, routeParams, resourceFactory, location) {
		  scope.planCodes = [];
	      scope.statusDatas = [];
          scope.formChangeData = {};
          
         resourceFactory.planMappingResource.getPlanMapping({planMappingId: routeParams.id} , function(data) {
            scope.formData=data;
            scope.planCodes = data.planCodeData;
            scope.statusDatas=data.status;
            scope.planMappingId=routeParams.id;
        });
        
        scope.submit = function() {	
               
               this.formChangeData.planId = this.formData.planId;
               this.formChangeData.planIdentification = this.formData.planIdentification
               this.formChangeData.status = this.formData.planStatus;
               
               resourceFactory.planMappingResource.update({'planMappingId': routeParams.id},this.formChangeData,function(data){
             location.path('/viewplanmapping/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditPlanMappingController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditPlanMappingController]).run(function($log) {
    $log.info("EditPlanMappingController initialized");
  });
}(mifosX.controllers || {}));
