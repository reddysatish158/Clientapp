<<<<<<< HEAD
(function(module) {
  mifosX.controllers = _.extend(module, {
	  GroupsDetailsController: function(scope, resourceFactory,$modal,route,PaginatorService,location) {
		scope.groupDetails  = [];
		
		scope.getSearchDetails = function(offset, limit, callback) {
	    	  resourceFactory.groupsDetailsResource.getDetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchDetails = function(filterText) {
	  			scope.groupDetails = PaginatorService.paginate(scope.getSearchDetails, 14);
	  		};
		
		scope.groupDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.groupsDetailsResource.getDetails({offset: offset, limit: limit} , callback);
		};
		
		scope.groupDetails =PaginatorService.paginate(scope.groupDetailsFetchFunction, 14);
		
		scope.addGroup = function(){
        	
	      	  $modal.open({
	                templateUrl : 'addGroupDetails.html',
	                controller : addGroupDetailsController,
	                resolve : {}
	            });
	        };
	        
	        var addGroupDetailsController = function ($scope, $modalInstance) {
        	  	
	        	  $scope.submit = function () {
	        		 resourceFactory.groupsDetailsResource.postDetails(this.formData,function(data){
	        			 route.reload();
	        	        },function(errData){
			          });
	        		  $modalInstance.close('delete');
	              };
	              $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	              };
	          };
		  
	  }
  });
  mifosX.ng.application.controller('GroupsDetailsController', ['$scope', 'ResourceFactory','$modal','$route','PaginatorService','$location', mifosX.controllers.GroupsDetailsController]).run(function($log) {
    $log.info("GroupsDetailsController initialized");
  });
=======
(function(module) {
  mifosX.controllers = _.extend(module, {
	  GroupsDetailsController: function(scope, resourceFactory,$modal,route,PaginatorService,location) {
		scope.groupDetails  = [];
		
		
		scope.getSearchDetails = function(offset, limit, callback) {
	    	  resourceFactory.groupsDetailsResource.getDetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchDetails = function(filterText) {
	  			scope.groupDetails = PaginatorService.paginate(scope.getSearchDetails, 14);
	  		};
		
		scope.groupDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.groupsDetailsResource.getDetails({offset: offset, limit: limit} , callback);
		};
		
		scope.groupDetails =PaginatorService.paginate(scope.groupDetailsFetchFunction, 14);
		
		scope.addProvision = function(id,name,attr1,attr2,attr3,attr4){
			var provisionData = {};
			provisionData.groupName = name;
			provisionData.attribute1 = attr1;
			provisionData.attribute2 = attr2;
			provisionData.attribute3 = attr3;
			provisionData.attribute4 = attr4;
			resourceFactory.groupsDetailsProvisionResource.save({groupId:id},provisionData,function(data){
   			   route.reload();
   	         });
		};
		
		scope.addGroup = function(){
        	
	      	  $modal.open({
	                templateUrl : 'addGroupDetails.html',
	                controller : addGroupDetailsController,
	                resolve : {}
	            });
	        };
	        
	        var addGroupDetailsController = function ($scope, $modalInstance) {
	        	$scope.formData = {};
	        	  $scope.submit = function () {
	        		 resourceFactory.groupsDetailsResource.save($scope.formData,function(data){
	        			 $modalInstance.close('delete');
	        			 route.reload();
	        	        },function(errData){
			          });
	              };
	              $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	              };
	          };
		  
	  }
  });
  mifosX.ng.application.controller('GroupsDetailsController', ['$scope', 'ResourceFactory','$modal','$route','PaginatorService','$location', mifosX.controllers.GroupsDetailsController]).run(function($log) {
    $log.info("GroupsDetailsController initialized");
  });
>>>>>>> 48a60ff22a3edd08cfeb7a5082c985a816595100
}(mifosX.controllers || {}));