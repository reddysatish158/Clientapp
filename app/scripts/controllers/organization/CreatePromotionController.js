(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePromotionController: function(scope, resourceFactory, location,dateFilter,webStorage) {
	        scope.discountTypeDatas = [];
	        scope.statuses = [];
	        scope.start={};
	        scope.start.date = new Date();
	        resourceFactory.discountTemplateResource.get(function(data) {
	            scope.discountTypeDatas = data.discounTypeData;
	            scope.statuses = data.status;
	            scope.formData = {
	            		
	            };
	        });
	      scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "Promotioncode" });
	           };
	        
	        scope.submit = function() {  
	        	 this.formData.locale = "en";
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var startDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	         //    this.formData.paymentDate= startDate;
	             this.formData.startDate=startDate;
	            resourceFactory.discountResource.save(this.formData,function(data){
	            	location.path('/viewdiscounts/'+data.resourceId);
	          });
	           
	            webStorage.add("callingTab", {someString: "Promotioncode" });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreatePromotionController', ['$scope', 'ResourceFactory', '$location','dateFilter','webStorage', mifosX.controllers.CreatePromotionController]).run(function($log) {
	    $log.info("CreatePromotionController initialized");
	  });
	}(mifosX.controllers || {}));

