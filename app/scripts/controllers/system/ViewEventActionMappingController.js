(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventActionMappingController: function(scope, routeParams , route, location, resourceFactory, http) {
		 // alert("hh");
        scope.eventactions = [];              
        resourceFactory.EventActionMappingResource.getDetails({id: routeParams.id} , function(data) {
        	//alert('view' +data);
            scope.eventactions = data;                                                
        });
        
        scope.deleteEventAction = function (){
            resourceFactory.EventActionMappingResource.delete({id: routeParams.id} , {} , function(data) {
                  location.path('/mappingconfig');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewEventActionMappingController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewEventActionMappingController]).run(function($log) {
    $log.info("ViewEventActionMappingController initialized");
  });
}(mifosX.controllers || {}));