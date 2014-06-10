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
            var key = CryptoJS.enc.Base64.parse( mifosX.models.encrptionKey);
            var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
            
            scope.reset123 = function(){
            	webStorage.add("callingTab", {someString: "documents" });
            };
			  scope.submit = function () {
				    this.formEncryptedData.type="ACH";
				    this.formEncryptedData.routingNumber = CryptoJS.AES.encrypt(this.formData.routingNumber, key, {iv: iv}).toString();
				    this.formEncryptedData.bankAccountNumber = CryptoJS.AES.encrypt(this.formData.bankAccountNumber, key, {iv: iv}).toString();
				    this.formEncryptedData.bankName = CryptoJS.AES.encrypt(this.formData.bankName, key, {iv: iv}).toString();		
				    this.formEncryptedData.name = this.formData.name;
				    this.formEncryptedData.accountType=this.formData.accountType;				   
	                resourceFactory.creditCardSaveResource.save({clientId:scope.clientId},this.formEncryptedData,function(data){
	                	webStorage.add("callingTab", {someString: "documents" });
	                    location.path('/viewclient/' + data.clientId);
	                });
	            };
			
		}
	});
	 mifosX.ng.application.controller('AddACHController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.AddACHController]).run(function($log) {
	        $log.info("AddACHController initialized");
	    });
}(mifosX.controllers || {}));
