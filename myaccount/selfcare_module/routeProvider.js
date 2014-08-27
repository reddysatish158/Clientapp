(function(selfcare) {
  var defineRouteProvider = function($routeProvider, $locationProvider) {
    $routeProvider
    
    .when('/home', {
    	templateUrl: 'selfcare_module/views/clients/home.html'
    })
    .when('/active/:mailId/:registrationKey', {
        templateUrl: 'selfcare_module/views/clients/activateuser.html'
      })
      .when('/registrationsuccess', {
        templateUrl: 'selfcare_module/views/clients/registrationsuccessform.html'
      })
      .when('/paymentbuttons', {
        templateUrl: 'selfcare_module/views/clients/paymentbuttons.html'
      })
      .when('/activeclientpreviewscreen', {
        templateUrl: 'selfcare_module/views/clients/activeclientpreviewscreen.html'
      })
      .when('/additionalorderspreviewscreen', {
    	  templateUrl: 'selfcare_module/views/clients/additionalorderspreviewscreen.html'
      })
      .when('/eventdetailspreviewscreen', {
    	  templateUrl: 'selfcare_module/views/clients/eventdetailspreviewscreen.html'
      })
      .when('/profile', {
        templateUrl: 'selfcare_module/views/clients/profile.html'
      })
      .when('/plans', {
        templateUrl: 'selfcare_module/views/clients/plans.html'
      })
      .when('/statements', {
        templateUrl: 'selfcare_module/views/clients/statements.html'
      })
      .when('/payments', {
        templateUrl: 'selfcare_module/views/clients/payments.html'
      })
      .when('/tickets', {
        templateUrl: 'selfcare_module/views/clients/tickets.html'
      })
      .when('/newTicket/:clientId', {
        templateUrl: 'selfcare_module/views/clients/newTicket.html'
      })
      .when('/changepwd', {
        templateUrl: 'selfcare_module/views/clients/changepassword.html'
      })
      .when('/additionalOrders', {
    	templateUrl: 'selfcare_module/views/clients/additionalorders.html'
      })
	  .when('/vodevents', {
	     templateUrl: 'selfcare_module/views/clients/vodevents.html'
	   });
      
    
    $locationProvider.html5Mode(false);
  };
  selfcare.ng.application.config(defineRouteProvider);
}(selfcare || {}));
