(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreditDistributionController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,validator,route,$modal) {

        scope.formData = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
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
        scope.showPaymentsDetails = false;
        scope.showInvoiceDetails = false;
        scope.invoiceDatas = [];
        scope.paymentDatas = [];
        var invoiceIdArray = [];
        var InvoiceAmount = 0;
        var paymentAmount;
        var paymentId;
        scope.creditDistributions = [];
        
       resourceFactory.creditDistributionTemplateResource.get({clientId : routeParams.id},function(data){
    		scope.invoiceDatas = data.invoiceDatas;
    		scope.paymentDatas = data.paymentDatas;
    		scope.avialableAmount = 20000;
    	});
        
        scope.showPayments = function(){
        	scope.showPaymentsDetails = ! scope.showPaymentsDetails;
        	scope.showInvoiceDetails = false;
        };
        
        scope.seletedPayment = function(id,amount){
        	paymentId = id;
        	paymentAmount = amount;
        };
        
        scope.selectedInvoices = function(invoiceId,amount,active){
        	if(active == true){
        		InvoiceAmount += amount;
        		if(InvoiceAmount > paymentAmount){
        			scope.active = "NO";
        			console.log("invoice amount high");
        			$modal.open({
              			 templateUrl: 'alert.html',
              			 controller: alertController,
              			 resolve:{}
              		 });
        		}
        		else{
        			invoiceIdArray.push({invoiceId : invoiceId,amount : amount});
        		}
        	}
        	else{
        		InvoiceAmount -= amount;
        	}
        };
        var alertController = function ($scope, $modalInstance) {
      	  $scope.approve = function () {
      		  $modalInstance.close('delete');
            };
        };
        scope.submit = function(){
        	console.log(invoiceIdArray);
        	for(var i in invoiceIdArray){
        		scope.creditDistributions.push ({
        											invoiceId : invoiceIdArray[i].invoiceId,
        											paymentId : paymentId,
        											clientId  : parseInt(routeParams.id),
        											amount    : invoiceIdArray[i].amount,
        											locale    : "en"
        		});
        	}
        	scope.avialableAmount -= InvoiceAmount;
        	scope.formData.avialableAmount = scope.avialableAmount;
        	scope.formData.paymentId = paymentId;
        	scope.formData.creditDistributions = scope.creditDistributions;
        	resourceFactory.creditDistributionResource.get({clientId : routeParams.id},scope.formData,function(data){
        		location.path('/viewclient/routeParams.id');
        	});
        };
	  }
  });
  mifosX.ng.application.controller('CreditDistributionController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','HTValidationService','$route','$modal', mifosX.controllers.CreditDistributionController]).run(function($log) {
    $log.info("CreditDistributionController initialized");
  });
}(mifosX.controllers || {}));