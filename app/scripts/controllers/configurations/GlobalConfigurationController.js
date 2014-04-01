(function(module) {
    mifosX.controllers = _.extend(module, {
        GlobalConfigurationController: function(scope,$modal,resourceFactory , location,route) {
            scope.configs = [];
            resourceFactory.configurationResource.get(function(data) {
                for(var i in data.globalConfiguration){
                    scope.configs.push(data.globalConfiguration[i]);
                }
                resourceFactory.cacheResource.get(function(data) {
                    for(var i in data ){
                        if(data[i].cacheType.id==2){
                            var cache = {};
                            cache.name = 'Is Cache Enabled';
                            cache.enabled =  data[i].enabled;
                        }
                    }
                    scope.configs.push(cache);
                });
            });
            
            scope.edit= function(id){
		      	  scope.errorStatus=[];
		      	  scope.errorDetails=[];
		      	  scope.editId=id;
		        	  $modal.open({
		                templateUrl: 'editglobal.html',
		                controller:editGlobalController ,
		                resolve:{}
		            });
		        	
		        };
		        
		        var editGlobalController=function($scope,$modalInstance){
			      	  
		        	$scope.formData = {}; 
		            $scope.statusData=[];
		            $scope.updateData={};
		            //console.log(scope.editId);
		            
		            
		           // DATA GET
		            
		            
		         	$scope.accept = function(){
		         		$scope.flag=true;
		         		this.updateData.value=this.formData.value;
		         		resourceFactory.pe.update({'id': scope.editId},this.updateData,function(data){ 
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
		        
            
            scope.enable = function(name) {
                if(name=='Is Cache Enabled'){
                    var temp = {};
                    temp.cacheType = 2;
                    resourceFactory.cacheResource.update(temp,function(data) {
                     route.reload();
                    });
                }
                else
                {
                var temp = {};
                temp[name] = 'true';
                resourceFactory.configurationResource.update(temp,'',function(data) {
                    route.reload();
                });
                }
            };
            scope.disable = function(name) {
                if(name=='Is Cache Enabled'){
                    var temp = {};
                    temp.cacheType = 1;
                    resourceFactory.cacheResource.update(temp,function(data) {
                        route.reload();
                    });
                }
                else
                {
                var temp = {};
                temp[name] = 'false';
                resourceFactory.configurationResource.update(temp,'',function(data) {
                    route.reload();
                });
                }
            };

        }
    });
    mifosX.ng.application.controller('GlobalConfigurationController', ['$scope','$modal', 'ResourceFactory', '$location','$route', mifosX.controllers.GlobalConfigurationController]).run(function($log) {
        $log.info("GlobalConfigurationController initialized");
    });
}(mifosX.controllers || {}));
