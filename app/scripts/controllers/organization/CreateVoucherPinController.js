(function(module) {
	  mifosX.controllers = _.extend(module, {
	    CreateVoucherPinController: function(scope, resourceFactory, location,dateFilter) {
	    	
	        scope.pinCategoryDatas = [];
	        scope.pinTypeDatas = [];
	        scope.plandatas = [];
	        scope.start={};
	        scope.start.date = new Date();
	        resourceFactory.voucherpinTemplateResource.get(function(data) {
	            scope.pinCategoryDatas = data.pinCategoryData;
	            //scope.pinTypeDatas = data.pinTypeData;
	            scope.pinTypeDatas.push({"value":"VALUE"},{"value":"PRODUCT"});
	            scope.formData = {
	            		
	            };
	        });
	        resourceFactory.orderTemplateResource.get({'planId': 0},function(data) {
	        	 
	            scope.planDatas = data.plandata;
	       });
	        scope.setPinValue = function(){
	        	this.formData.pinValue = null;
	        };
	        
	        scope.submit = function() {  

	        	 this.formData.locale = "en";
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var exipiryDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	             this.formData.expiryDate=exipiryDate;
<<<<<<< HEAD
	           //  this.formData.pinExtention="Rs.";
=======
	             //this.formData.pinExtention="Rs.";
>>>>>>> 48a60ff22a3edd08cfeb7a5082c985a816595100
	            resourceFactory.voucherpinResource.save(this.formData,function(data){
	            	location.path('/voucherpins');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateVoucherPinController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreateVoucherPinController]).run(function($log) {
	    $log.info("CreateVoucherPinController initialized");
	  });
	}(mifosX.controllers || {}));

