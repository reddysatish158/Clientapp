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
}(mifosX.controllers || {}));