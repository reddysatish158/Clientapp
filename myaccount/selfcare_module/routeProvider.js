(function(selfcare) {
  var defineRouteProvider = function($routeProvider, $locationProvider) {
    $routeProvider
    
    .when('/active/:mailId/:registrationKey', {
        templateUrl: 'selfcare_module/views/clients/activateuser.html'
      })
      .when('/registrationsuccess', {
        templateUrl: 'selfcare_module/views/clients/registrationsuccessform.html'
      })
      .when('/paymentbuttons', {
        templateUrl: 'selfcare_module/views/clients/paymentbuttons.html'
      })
      .when('/previewscreen', {
        templateUrl: 'selfcare_module/views/clients/previewscreen.html'
      })
      .when('/clients/:clientId', {
        templateUrl: 'selfcare_module/views/clients/clients.html'
      });
      
    
    $locationProvider.html5Mode(false);
  };
  selfcare.ng.application.config(defineRouteProvider);
}(selfcare || {}));
