(function(module) {
  mifosX.controllers = _.extend(module, {
	  IpPoolingController: function(scope,route,routeParams,location, resourceFactory, paginatorService) {
		  
		  scope.ippoolingdatas = [];
		  
		  scope.ipPoolingAllData = function(offset, limit, callback) {
	 			 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit} , callback);
			};
		  
		  scope.ippoolingdatas = paginatorService.paginate(scope.ipPoolingAllData, 14);
		  
		  scope.routeTo = function(id){
	        	if(id != 0){
	            location.path('/viewclient/'+ parseInt(id));
	        	}else{
	        		 location.path('/createclient');		
	        	}
	          };
	          
	          scope.changeSourceData = function(offset, limit, callback) {
	        	  if(scope.formData.source =='all' ){

						
						 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit} , callback);
			          
	        	  }else{
					
					 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit, 
						 status: scope.formData.source  } , callback);
		          };
	          }
	scope.changeSource=function(source){
				
				// resourceFactory.ipPoolingResource.get({offset: offset, limit: limit,source:source} , callback);
		scope.ippoolingdatas  = paginatorService.paginate(scope.changeSourceData, 14);
			};
			

	      scope.searchIpPoolData = function(offset, limit, callback) { 
		    	  resourceFactory.ipPoolingResource.get({offset: offset, limit: limit,status: scope.formData.source, sqlSearch: scope.filterText} , callback);
		          };
		  		
		  scope.searchIpPool = function(filterText) {
		  			scope.ippoolingdatas = paginatorService.paginate(scope.searchIpPoolData, 14);
		  		};    
		  
		  /*
		  
		  scope.ippoolingdatas = [];
		  
		//for All tab

			 scope.ipPoolingAllData = function(offset, limit, callback) {
	 			 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit} , callback);
			};
	 		
	 		scope.getIpPooling = function () {
	       	scope.ippoolingdatas = paginatorService.paginate(scope.ipPoolingAllData, 14);
	       };
			
			
			scope.searchAllPaymentData = function(offset, limit, callback) { 
		    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
		    		  sqlSearch: scope.filterText} , callback);
		          };
		  		
		  	scope.searchPaymentId = function(filterText) {
		  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchAllPaymentData, 14);
		  		};
		  		
		  	//for Failure tab
		  		
		 		 scope.ipPoolFailData = function(offset, limit, callback) {
		  			 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit,tabType: 'F'} , callback);
		 		};
		  		
		  		scope.getIpPoolStatusFail = function () {
		        	scope.ippoolingdatas = paginatorService.paginate(scope.ipPoolFailData, 14);
		        };
		 		
		 		
		 		scope.searchFailedPaymentData = function(offset, limit, callback) { 
			    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
			    		  sqlSearch: scope.filterText, tabType: 'Failure'} , callback);
			          };
			  		
			  	scope.searchFailedPaymentId = function(filterText) {
			  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchFailedPaymentData, 14);
			  		};
			  		
			  		
			  	// for success Tab       
			   
			    scope.ipPoolingSuccessData = function(offset, limit, callback) {
			  			 resourceFactory.ipPoolingResource.get({offset: offset, limit: limit, tabType: 'Y'} , callback);
			 		};
			 		
			 	scope.getIpPoolStatusSuccess = function () {
				        scope.ippoolingdatas = paginatorService.paginate(scope.ipPoolingSuccessData, 14);
				    };
				        
			  	scope.searchSuccessPaymentData = function(offset, limit, callback) {
				    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
				    		  sqlSearch: scope.filterText, tabType: 'Success'} , callback);
				          };
				  		
			    scope.searchSuccessPaymentId = function(filterText) {
				  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchSuccessPaymentData, 14);
				  		};	
	  		
	  */
		  }
  });
  mifosX.ng.application.controller('IpPoolingController', ['$scope','$route','$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.IpPoolingController]).run(function($log) {
    $log.info("IpPoolingController initialized");
  });
}(mifosX.controllers || {}));


