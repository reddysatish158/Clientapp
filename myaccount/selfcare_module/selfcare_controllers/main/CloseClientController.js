(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  CloseClientController: function(scope,RequestSender,location,routeParams,dateFilter) {
		  
		  scope.formData={};	
		  scope.closureReasons =[];

		  scope.close = {};
		  scope.close.date = new Date();
		  scope.minDate= scope.close.date;
		  
		  
		  RequestSender.clientTemplateResource.get({commandParam:'close'} ,function(data) {
			    scope.closureReasons = data.closureReasons;
			    
			});
			            
		scope.submit = function() {
				scope.formData.locale = 'en';
				var reqDate = dateFilter(scope.close.date,'dd MMMM yyyy');
				scope.formData.closureDate = reqDate;
				scope.formData.dateFormat = 'dd MMMM yyyy';

				RequestSender.clientResource.save({'clientId': routeParams.clientId,command:'close'},scope.formData,function(data){
                
                 location.path('/profile');
               });
		};
    }
  });
  selfcare.ng.application.controller('CloseClientController', ['$scope','RequestSender','$location','$routeParams','dateFilter', selfcare.controllers.CloseClientController]);
}(selfcare.controllers || {}));
