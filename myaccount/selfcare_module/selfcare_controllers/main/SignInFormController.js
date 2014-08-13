(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  SignInFormController: function(scope,webStorage ) {
		  
		  
    }
  });
  selfcare.ng.application.controller('SignInFormController', ['$scope','webStorage', selfcare.controllers.SignInFormController]);
}(selfcare.controllers || {}));
