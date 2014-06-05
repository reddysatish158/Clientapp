(function(module) {
	mifosX.controllers = _.extend(module, {
		AddNewCreditCardController : function(scope,webStorage, routeParams , location, resourceFactory,dateFilter) {
			scope.clientId = routeParams.clientId;
			scope.id = routeParams.id;
			scope.type = routeParams.type;
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
            scope.cardTypeDatas = ['MASTERCARD','VISA','DISCOVERY','MAESTRO','OTHERS'];
            
            var errors = []; 
            scope.cradNumberErrorHide = function(){
            	 scope.cardNumberDigit = false;
            	 scope.cardNumberValid = false;
            	 errors = []; 
            };
            scope.cardExpireErrorHide = function(){
           	     scope.patternMatch = false;
           	     scope.cardExpire = false;
           	     errors = []; 
           };
           
           scope.cardCvvNoErrorHide = function(){
           	scope.cardCvvNoDigit = false;
           	errors = []; 
           };
            
            var cardExpireDate = function(dateVal){
            	  var now=new Date();
				  var nowMonth = now.getMonth()+1;var nowYear = now.getFullYear();
				  var inputDate = (dateVal).split("/");
				  var inputMonth = parseInt(inputDate[0]);var inputYear = parseInt(inputDate[1]);
				  if(inputMonth<=nowMonth ){
					  if(inputYear<=nowYear) return true;
					  else  return false;
				  }else if(inputMonth>nowMonth){
					  if(inputYear<nowYear) return true;
					  else  return false;
				  }
            };
            var cardNumberValid = function(value){
            	
            	// accept only digits and dashes
            	if (/[^0-9-]+/.test(value))
            		return false;
            	var nCheck = 0,nDigit = 0,bEven = false;
            	
            	value = value.replace(/\D/g, "");

            	for (n = value.length - 1; n >= 0; n--) {
            		var cDigit = value.charAt(n);
            		var nDigit = parseInt(cDigit, 10);
            		if (bEven) {
            			if ((nDigit *= 2) > 9) nDigit -= 9;
            		}
            		nCheck += nDigit;
            		bEven = !bEven;
            	}
            	return (nCheck % 10) == 0;
            };
            scope.reset123 = function(){
            	 webStorage.add("callingTab", {someString: "documents" });
            };
          
			  scope.submit = function () {
				  
				  var cardNumber = $('#cardNumber').val();
				  if(cardNumber){
					  cardNumber = cardNumber.replace(/ +/g, "");
					  var digitMatch=cardNumber.match(/^\d+$/);
					  if (!digitMatch){
						 scope.cardNumberDigit = true;
						 errors.push({"cardNumberDigit":'true'});
					  }else if(!cardNumberValid(cardNumber)){
						  scope.cardNumberValid = true;
						  errors.push({"cardNumberValid":'true'});
					  }
				  }
				  
				  var cardExpiryDate = $('#cardExpiryDate').val();
				  if(cardExpiryDate){
					  var match=$('#cardExpiryDate').val().match(/^\s*(0?[1-9]|1[0-2])\/(\d{4})\s*$/);
					  if (!match){
						  scope.patternMatch = true;
						  errors.push({"patternMatch":'true'});
					  }else if(cardExpireDate(cardExpiryDate)){
						  scope.cardExpire = true;
						  errors.push({"cardExpire":'true'});
					  }
				  }
				  if(cardCvvNo){
					  var match = $('#cardCvvNo').val().match(/^(?!0+$)\d{1,19}$/);
					  if(!match){
						  scope.cardCvvNoDigit = true;
						  errors.push({"cardCvvNoDigit":'true'});
					  }
				  }
				  
				  if(errors.length == 0){
				     
				    this.formEncryptedData.type="CreditCard";
					this.formEncryptedData.cardType = scope.formData.cardType;
				    this.formEncryptedData.name = this.formData.name;
				    this.formEncryptedData.cvvNumber = CryptoJS.AES.encrypt(scope.formData.cvvNumber, "Secret Passphrase").toString();
				    this.formEncryptedData.cardNumber = CryptoJS.AES.encrypt(this.formData.cardNumber, "Secret Passphrase").toString();
				    this.formEncryptedData.cardExpiryDate = CryptoJS.AES.encrypt(this.formData.cardExpiryDate, "Secret Passphrase").toString();
				    resourceFactory.creditCardUpdateResource.delete({clientId: scope.clientId, id: scope.id} , {},function(data){
				    	resourceFactory.creditCardSaveResource.save({clientId:scope.clientId},this.formEncryptedData,function(data){
				    		webStorage.add("callingTab", {someString: "documents" });
				    		location.path('/viewclient/' + data.clientId);
				    	});
				    });
				  }
			  };
	      }
	});
	 mifosX.ng.application.controller('AddNewCreditCardController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','dateFilter', mifosX.controllers.AddNewCreditCardController]).run(function($log) {
	        $log.info("AddNewCreditCardController initialized");
	    });
}(mifosX.controllers || {}));