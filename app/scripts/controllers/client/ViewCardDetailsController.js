(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewCardDetailsController: function(scope, routeParams , route, location, resourceFactory, http) {
        scope.clientcarddetails = {};
        resourceFactory.creditCardUpdateResource.get({clientId: routeParams.clientId, id: routeParams.id, cardType: routeParams.cardType} , function(data) {
            scope.clientcarddetails = data;  

            if(scope.clientcarddetails.cardType=='CreditCard'){
            	  
          	    var decrypted = CryptoJS.AES.decrypt(scope.clientcarddetails.name, "Secret Passphrase");
          	    scope.clientcarddetails.name = decrypted.toString(CryptoJS.enc.Utf8);
          	    
			        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails.cardNumber, "Secret Passphrase");
			        scope.clientcarddetails.cardNumber = decrypted1.toString(CryptoJS.enc.Utf8);
			        
			        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails.cardExpiryDate, "Secret Passphrase");
			        scope.clientcarddetails.cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
			        
            }else if(scope.clientcarddetails.cardType=='ACH'){
            	  
          	    var decrypted = CryptoJS.AES.decrypt(scope.clientcarddetails.name, "Secret Passphrase");
        	        scope.clientcarddetails.name = decrypted.toString(CryptoJS.enc.Utf8);
        	        
			        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails.routingNumber, "Secret Passphrase");
			        scope.clientcarddetails.routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
			        
			        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails.bankAccountNumber, "Secret Passphrase");
			        scope.clientcarddetails.bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
			        
			        var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails.bankName, "Secret Passphrase");
			        scope.clientcarddetails.bankName = decrypted3.toString(CryptoJS.enc.Utf8);
            }
        });
        
        scope.deletecardDetails = function (){
            resourceFactory.creditCardUpdateResource.delete({clientId: routeParams.clientId, id: routeParams.id} , {} , function(data) {
                  location.path('/viewclient/'+routeParams.clientId);      
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewCardDetailsController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewCardDetailsController]).run(function($log) {
    $log.info("ViewCardDetailsController initialized");
  });
}(mifosX.controllers || {}));