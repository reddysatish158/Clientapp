(function(module) {
	mifosX.controllers = _.extend(module, {
		AddACHController : function(scope,webStorage, routeParams , location, resourceFactory) {
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
				    this.formEncryptedData.cardType="ACH";
				    this.formEncryptedData.routingNumber = CryptoJS.AES.encrypt(this.formData.routingNumber, "Secret Passphrase").toString();
				    this.formEncryptedData.bankAccountNumber = CryptoJS.AES.encrypt(this.formData.bankAccountNumber, "Secret Passphrase").toString();
				    this.formEncryptedData.bankName = CryptoJS.AES.encrypt(this.formData.bankName, "Secret Passphrase").toString();		
				    this.formEncryptedData.name = CryptoJS.AES.encrypt(this.formData.name, "Secret Passphrase").toString();
				    this.formEncryptedData.accountType=this.formData.accountType;				   
	                resourceFactory.creditCardSaveResource.save({clientId:scope.clientId},this.formEncryptedData,function(data){
	                    location.path('/viewclient/' + data.clientId);
	                });
	                webStorage.add("callingTab", {someString: "creditcard" });
	            };
			
		}
	});
	 mifosX.ng.application.controller('AddACHController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.AddACHController]).run(function($log) {
	        $log.info("AddACHController initialized");
	    });
}(mifosX.controllers || {}));
