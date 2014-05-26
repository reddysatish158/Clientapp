(function(module) {
	mifosX.controllers = _.extend(module, {
		AddCreditCardController : function(scope,webStorage, routeParams , location, resourceFactory) {
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
			  scope.submit = function () {
				    this.formEncryptedData.cardType="CreditCard";
				    this.formEncryptedData.name = CryptoJS.AES.encrypt(this.formData.name, "Secret Passphrase").toString();
				    this.formEncryptedData.cardNumber = CryptoJS.AES.encrypt(this.formData.cardNumber, "Secret Passphrase").toString();
				    this.formEncryptedData.cardExpiryDate = CryptoJS.AES.encrypt(this.formData.cardExpiryDate, "Secret Passphrase").toString();			        
				       /* var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
				        var plainText = decrypted.toString(CryptoJS.enc.Utf8);
				        alert('decrypted is : '+plainText);*/
	                resourceFactory.creditCardSaveResource.save({clientId:scope.clientId},this.formEncryptedData,function(data){
	                    location.path('/viewclient/' + data.clientId);
	                });
	                webStorage.add("callingTab", {someString: "creditcard" });
	            };
			
		}
	});
	 mifosX.ng.application.controller('AddCreditCardController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.AddCreditCardController]).run(function($log) {
	        $log.info("AddCreditCardController initialized");
	    });
}(mifosX.controllers || {}));
