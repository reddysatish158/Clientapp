(function(module) {
	mifosX.controllers = _.extend(module, {
		EditCardDetailController : function(scope,webStorage, routeParams , location, resourceFactory) {
			scope.clientId = routeParams.clientId;
            var clientData = webStorage.get('clientData');
            scope.hwSerialNumber=clientData.hwSerialNumber;
            scope.displayName=clientData.displayName;
            scope.statusActive=clientData.statusActive;
            scope.accountNo=clientData.accountNo;
            scope.officeName=clientData.officeName;
            scope.balanceAmount=clientData.balanceAmount;
            scope.currency=clientData.currency;
            scope.imagePresent=clientData.imagePresent;
            scope.categoryType=clientData.categoryType;
            scope.email=clientData.email;
            scope.phone=clientData.phone;
            scope.formData = {};
            scope.formEncryptedData = {};
            
            resourceFactory.creditCardUpdateResource.get({clientId: routeParams.clientId, id: routeParams.id, cardType: routeParams.cardType} , function(data) {
                scope.formData = data;  
                if(scope.formData.cardType=='CreditCard'){
                	  
              	    var decrypted = CryptoJS.AES.decrypt(scope.formData.name,mifosX.models.encrptionKey);
              	    scope.formData.name = decrypted.toString(CryptoJS.enc.Utf8);
              	    
    			        var decrypted1 = CryptoJS.AES.decrypt(scope.formData.cardNumber, "Secret Passphrase");
    			        scope.formData.cardNumber = decrypted1.toString(CryptoJS.enc.Utf8);
    			        
    			        var decrypted2 = CryptoJS.AES.decrypt(scope.formData.cardExpiryDate, "Secret Passphrase");
    			        scope.formData.cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
    			        
                }else if(scope.formData.cardType=='ACH'){
                	  
              	    var decrypted = CryptoJS.AES.decrypt(scope.formData.name, "Secret Passphrase");
            	        scope.formData.name = decrypted.toString(CryptoJS.enc.Utf8);
            	        
    			        var decrypted1 = CryptoJS.AES.decrypt(scope.formData.routingNumber, "Secret Passphrase");
    			        scope.formData.routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
    			        
    			        var decrypted2 = CryptoJS.AES.decrypt(scope.formData.bankAccountNumber, "Secret Passphrase");
    			        scope.formData.bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
    			        
    			        var decrypted3 = CryptoJS.AES.decrypt(scope.formData.bankName, "Secret Passphrase");
    			        scope.formData.bankName = decrypted3.toString(CryptoJS.enc.Utf8);
                }
            });
            
			  scope.submit = function () {
				  
				    if(this.formData.cardType=='ACH'){
				    	    this.formEncryptedData.cardType=this.formData.cardType;
						    this.formEncryptedData.routingNumber = CryptoJS.AES.encrypt(this.formData.routingNumber, "Secret Passphrase").toString();
						    this.formEncryptedData.bankAccountNumber = CryptoJS.AES.encrypt(this.formData.bankAccountNumber, "Secret Passphrase").toString();
						    this.formEncryptedData.bankName = CryptoJS.AES.encrypt(this.formData.bankName, "Secret Passphrase").toString();		
						    this.formEncryptedData.name = CryptoJS.AES.encrypt(this.formData.name, "Secret Passphrase").toString();
						    this.formEncryptedData.accountType=this.formData.accountType;		
				    }else{
				    	this.formEncryptedData.cardType=this.formData.cardType;
					    this.formEncryptedData.name = CryptoJS.AES.encrypt(this.formData.name, "Secret Passphrase").toString();
					    this.formEncryptedData.cardNumber = CryptoJS.AES.encrypt(this.formData.cardNumber, "Secret Passphrase").toString();
					    this.formEncryptedData.cardExpiryDate = CryptoJS.AES.encrypt(this.formData.cardExpiryDate, "Secret Passphrase").toString();			        
				    }
				   		   
	                resourceFactory.creditCardUpdateResource.update({clientId: routeParams.clientId, id: routeParams.id, cardType: routeParams.cardType},this.formEncryptedData,function(data){
	                    location.path('/viewclient/' + data.clientId);
	                });
	                webStorage.add("callingTab", {someString: "creditcard" });
	            };
			
		}
	});
	 mifosX.ng.application.controller('EditCardDetailController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.EditCardDetailController]).run(function($log) {
	        $log.info("EditCardDetailController initialized");
	    });
}(mifosX.controllers || {}));
