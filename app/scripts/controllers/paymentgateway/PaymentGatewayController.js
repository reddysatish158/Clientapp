(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentGatewayController: function(scope,webStorage,route,$modal, routeParams,location, resourceFactory, paginatorService,PermissionService,dateFilter,API_VERSION,$rootScope) {
		 scope.PermissionService = PermissionService;
        scope.paymentgatewaydatas = [];
        scope.formData={};
	      //for All tab
        
        scope.formData.source ='all';
			 scope.paymentGatewayAllData = function(offset, limit, callback) {
				 if(scope.formData.source == 'all'){
						 resourceFactory.paymentGatewayResource.get({offset: offset,limit: limit} , callback);
					}else{
						resourceFactory.paymentGatewayResource.get({offset: offset,source: scope.formData.source, limit: limit} , callback);
					}
	 			
			};
	 		
	 		scope.getPaymentGateway = function () {
	       	scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewayAllData, 14);
	       };
			
			scope.changeSource=function(source){
				
				// resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source:source} , callback);
				 scope.paymentgatewaydatas = paginatorService.paginate(scope.changeSourceData, 14);
			};
			
			scope.changeSourceData = function(offset, limit, callback) {
				
				if(scope.formData.source == 'all'){
					
					 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit 
			    		  } , callback);
				}else{
					
					
					 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
			    		  source: scope.formData.source} , callback);
				}
		    	 
		          };
			
			scope.searchAllPaymentData = function(offset, limit, callback) { 
		    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source, 
		    		  sqlSearch: scope.filterText} , callback);
		          };
		  		
		  	scope.searchPaymentId = function(filterText) {
		  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchAllPaymentData, 14);
		  		};
	  		
        
	 		//for Failure tab
		  		
	 		 scope.paymentGatewayFailureData = function(offset, limit, callback) {
	 			if(scope.formData.source == 'all'){
	 				resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,tabType: 'Failure'} , callback);
	 			}
	 			else{
	  			 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source,tabType: 'Failure'} , callback);
	 			}
	 		};
	  		
	  		scope.getPaymentGatewayFailure = function () {
	        	scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewayFailureData, 14);
	        };
	 		
	 		
	 		scope.searchFailedPaymentData = function(offset, limit, callback) { 
		    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
		    		  sqlSearch: scope.filterText, tabType: 'Failure'} , callback);
		          };
		  		
		  	scope.searchFailedPaymentId = function(filterText) {
		  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchFailedPaymentData, 14);
		  		};
		  		
		  		
		  	// for success Tab       
		   
		    scope.paymentGatewaySuccessData = function(offset, limit, callback) {
		    	if(scope.formData.source == 'all'){
		  			 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, tabType: 'Success'} , callback);
		    	}else{
		  			resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source, tabType: 'Success'} , callback);
		    	}
		 		};
		 		
		 	scope.getPaymentGatewaySuccess = function () {
			        	scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewaySuccessData, 14);
			        };
			        
		  	scope.searchSuccessPaymentData = function(offset, limit, callback) {
		  		if(scope.formData.source == 'all'){
			    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,
			    		  sqlSearch: scope.filterText, tabType: 'Success'} , callback);
		  		}else{
			    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, source: scope.formData.source,
			    		  sqlSearch: scope.filterText, tabType: 'Success'} , callback);
		  		}
			          };
			  		
		    scope.searchSuccessPaymentId = function(filterText) {
			  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchSuccessPaymentData, 14);
			  		};		

		   // for Finished Tab
			  		
		    scope.paymentGatewayFinishedData = function(offset, limit, callback) {
		    	if(scope.formData.source == 'all'){
			  			 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, tabType: 'Finished'} , callback);
		    	}else{
			  			resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source, tabType: 'Finished'} , callback);
		    	}
			 		};
			  		
		    scope.getFinishedPaymentGateway = function () {
			        	scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewayFinishedData, 14);
			        };
			        
			        
			scope.searchFinishedPaymentData = function(offset, limit, callback) {
				if(scope.formData.source == 'all'){
				    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, 
				    		  sqlSearch: scope.filterText, tabType: 'Finished'} , callback);
				}else{
				    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit, source: scope.formData.source,
				    		  sqlSearch: scope.filterText, tabType: 'Finished'} , callback);
				}
				          };
				  		
			scope.searchFinishedPaymentId = function(filterText) {
				  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchFinishedPaymentData, 14);
				  		};
			
		  // for Invalid Tab
			        
			scope.paymentGatewayInvalidData = function(offset, limit, callback) {
				if(scope.formData.source == 'all'){
			  			 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,tabType: 'Invalid'} , callback);
			  	}else{
			  			 resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source, tabType: 'Invalid'} , callback);
			  	}
			 		};  
			 		
			scope.getInvalidPaymentGateway = function () {
			        	scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewayInvalidData, 14);
			        };
			        
			scope.searchInvalidPaymentData = function(offset, limit, callback) {
				if(scope.formData.source == 'all'){
				    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source, 
				    		  sqlSearch: scope.filterText, tabType: 'Invalid'} , callback);
				}else{
				    	  resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source, 
				    		  sqlSearch: scope.filterText, tabType: 'Invalid'} , callback);
				}
				          };
				  		
			scope.searchInvalidPaymentId = function(filterText) {
				  			scope.paymentgatewaydatas = paginatorService.paginate(scope.searchInvalidPaymentData, 14);
				  		};
			
			//Download data into csv file
				  		
			scope.download = function(){
				$modal.open({
                    templateUrl: 'downloadpaymentgatewaydata.html',
                    controller: DownloadPaymentGatewayDataController,
                    resolve:{}
                });
			};
			
			var DownloadPaymentGatewayDataController = function($scope,$modalInstance){
				
				var date = new Date(), y = date.getFullYear(), m = date.getMonth();
				$scope.formData = {};
				$scope.start = {};
				$scope.start.date = new Date(y, m, 1);
				$scope.to = {};
				$scope.to.date = new Date();
				
				$scope.accept = function(){
					var fromDate = new Date($scope.start.date).getTime();
					var toDate = new Date($scope.to.date).getTime();
					
					
					window.open($rootScope.hostUrl+ API_VERSION +'/paymentgateways/download?fromDate='+fromDate+'&source='+$scope.formData.source+'&status='+$scope.formData.status+'&toDate='+toDate+'&tenantIdentifier=default');
					$modalInstance.close('delete');
/*	        		resourceFactory.downloadPaymentGatewayData.get({source: $scope.formData.source,fromDate: fromDate ,toDate: toDate},function(data) {	
	        			
	        			
	        			
	        			var json = data;
	        		    var csv = $scope.JSON2CSV(json);
	        		    //window.open("data:text/csv;charset=utf-8," + escape(csv));

	        			
	                    $modalInstance.close('delete');
	                },function(errorData){
	                	$scope.flagStatementPop = false;
	                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
	                	console.log(errorData);
	                	console.log($scope.stmError);
	                });*/
				};
				
				$scope.reject = function(){
					console.log("dialog closed");
					$modalInstance.dismiss('cancel');
				}
				
				/*$scope.JSON2CSV = function(objArray) {
				    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

				    var str = '';
				    var line = '';
				        
				        for (var index in array[0]) {
				            line += index + ',';
				        }
				            
				        line = line.slice(0, -1);
				        str += line + '\r\n';

				    for (var i = 0; i < array.length; i++) {
				        var line = '';
				        
				            for (var index in array[i]) {
				                line += array[i][index] + ',';
				            }

				        line = line.slice(0, -1);
				        str += line + '\r\n';
				    }
				    return str;
				    
				};*/
			};
				  		
		// edit popup
				  		
				  		scope.edit= function(id){
				      	  scope.errorStatus=[];
				      	  scope.errorDetails=[];
				      	  scope.editId=id;
				        	  $modal.open({
				                templateUrl: 'editpaymentgateway.html',
				                controller:editpaymentgatewayController ,
				                resolve:{}
				            });
				        	
				        };
				        
				        
				        var editpaymentgatewayController=function($scope,$modalInstance){
				      	  
				        	$scope.formData = {}; 
				            $scope.statusData=[];
				            $scope.updateData={};
				            //console.log(scope.editId);
				            resourceFactory.paymentGatewayResource.getData({'id': scope.editId},this.formData,function(data){
				            	 $scope.formData=data;
				            	 $scope.statusData=data.statusData;
				            	 $scope.formData.paymentdata=data.statusData[0].code;
				             });
				         	$scope.accept = function(){
				         		$scope.flag=true;
				         		this.updateData.status=this.formData.paymentdata;
				            	this.updateData.remarks=this.formData.remarks;
				         		resourceFactory.paymentGatewayResource.update({'id': scope.editId},this.updateData,function(data){ 
				                  route.reload();
				                 // location.path('/paymentGateway');
				                        $modalInstance.close('delete');
				                    },function(errData){
				                  $scope.flag = false;
				                   });
				         	};  
				    		$scope.reject = function(){
				    			$modalInstance.dismiss('cancel');
				    		};
				        };
				        
				        
				     // for Processed Tab

                        scope.paymentGatewayProcessedData = function(offset, limit, callback) {
                        	if(scope.formData.source == 'all'){
                             resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,tabType: 'Processed'} , callback);
                        	}else{
                             resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source, tabType: 'Processed'} , callback);
                        	}
                                        };

                        scope.getProcessedPaymentGateway = function () {
                                        scope.paymentgatewaydatas = paginatorService.paginate(scope.paymentGatewayProcessedData, 14);
                                };

                        scope.searchProcessedPaymentData = function(offset, limit, callback) {
                        	if(scope.formData.source == 'all'){
                                          resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,
                                                  sqlSearch: scope.filterText, tabType: 'Processed'} , callback);
                        	}else{
                                          resourceFactory.paymentGatewayResource.get({offset: offset, limit: limit,source: scope.formData.source,
                                              sqlSearch: scope.filterText, tabType: 'Processed'} , callback);
                        	}
                                          };

                        scope.searchProcessedPaymentId = function(filterText) {
                                                        scope.paymentgatewaydatas = paginatorService.paginate(scope.searchProcessedPaymentData, 14);
                                                };
          
    }
  });
  mifosX.ng.application.controller('PaymentGatewayController', ['$scope','webStorage', '$route','$modal','$routeParams', '$location', 'ResourceFactory','PaginatorService','PermissionService','dateFilter','API_VERSION','$rootScope', mifosX.controllers.PaymentGatewayController]).run(function($log) {
    $log.info("PaymentGatewayController initialized");
  });
}(mifosX.controllers || {}));


