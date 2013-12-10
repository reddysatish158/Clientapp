(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateHardwarePlanMappingController: function(scope, resourceFactory, location) {
	        scope.itemDatas = [];
	        scope.planDatas = [];
	        
	        resourceFactory.hardwaretemplateMappingResource.getTemplateData(function(data) {
	        	
	            scope.itemDatas = data.itemDatas;
	            scope.planDatas = data.planDatas;
	            scope.formData = {
	            		
	            };
	        });
	        
	        scope.submit = function() {  
	        	
	            resourceFactory.hardwareMappingResource.save(this.formData,function(data){
	            	location.path('/mappingconfig');
	            	
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateHardwarePlanMappingController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateHardwarePlanMappingController]).run(function($log) {
	    $log.info("CreateHardwarePlanMappingController initialized");
	  });
	}(mifosX.controllers || {}));

