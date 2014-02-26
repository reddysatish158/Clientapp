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
        scope.invoiceIdArray = [];
        var InvoiceAmount = 0;
       
        var paymentAmount;
        var paymentId;
        var paymentIndex=0;
        scope.creditdistributions = [];
        
       resourceFactory.creditDistributionTemplateResource.get({clientId : routeParams.id},function(data){
    		scope.invoiceDatas = data.invoiceDatas;
    		scope.paymentDatas = data.paymentDatas;
    		scope.avialableAmount = 20000;
    	});
        
        scope.showPayments = function(){
        	scope.showPaymentsDetails = ! scope.showPaymentsDetails;
        	scope.showInvoiceDetails = false;
        	
        };
        
        scope.seletedPayment = function(id,amount,availableAmount,index){
        	$('.unCheck').prop('checked',false);
        	scope.creditdistributions = [];
        	scope.showInvoices = true;
        	paymentId = id;
        	paymentAmount = amount;
        	paymentIndex=index;
        	scope.showInvoiceDetails=false; 
        	
        };
        
        scope.selectedInvoices = function(invoiceId,amount,active,index){
        	
        	if(active == true){
        		/*InvoiceAmount += amount;
        		scope.paymentDatas[paymentIndex].availAmount -=InvoiceAmount;*/
        		//InvoiceAmount += amount;
        		if(scope.paymentDatas[paymentIndex].availAmount == 0){
        			$('#'+invoiceId).prop('checked',false);
        			scope.active = "NO";
        			console.log("invoice amount high");
        			$modal.open({
              			 templateUrl: 'alert.html',
              			 controller: alertController,
              			 resolve:{}
              		 });
        		}else if(amount >= paymentAmount){
        			
        			InvoiceAmount += paymentAmount;
        			
        			scope.paymentDatas[paymentIndex].availAmount =0;//InvoiceAmount;
        		//	scope.avialableAmount =0;
        			scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : paymentAmount,
        				paymentId : paymentId,
						clientId  : parseInt(routeParams.id),
						locale    : "en"
						
        				});
        			
        			/*
        			
        			scope.active = "NO";
        			console.log("invoice amount high");
        			$modal.open({
              			 templateUrl: 'alert.html',
              			 controller: alertController,
              			 resolve:{}
              		 });
        		*/}
        		else{
        		
        			InvoiceAmount += amount;
            		scope.paymentDatas[paymentIndex].availAmount -=amount;
        			
        			scope.creditdistributions.push({
        				invoiceId : invoiceId,
        				amount : amount,
        				paymentId : paymentId,
						clientId  : parseInt(routeParams.id),
						locale    : "en"
						
        				});
        		}
        	}
        	else{
        		
        		scope.paymentDatas[paymentIndex].availAmount +=amount;
        		scope.creditdistributions.splice(index,1);
        		
        		
        		scope.creditdistributions = _.filter(scope.creditdistributions, function(item) {
                    return item.invoiceId != invoiceId;
               });
        		
        		//scope.creditdistributions = _.without(scope.creditdistributions,invoiceId);
        		InvoiceAmount -= amount;
        		
        	}
        };
        var alertController = function ($scope, $modalInstance) {
      	  $scope.approve = function () {
      		  $modalInstance.close('delete');
            };
        };
        scope.submit = function(){
        	console.log(scope.invoiceIdArray);
        	/*for(var i in scope.invoiceIdArray){
        		scope.creditdistributions.push ({
        											invoiceId : scope.invoiceIdArray[i].invoiceId,
        											paymentId : paymentId,
        											clientId  : parseInt(routeParams.id),
        											amount    : scope.invoiceIdArray[i].amount,
        											locale    : "en"
        		});
        	}*/
        	
        //	scope.formData.creditdistributions=scope.creditdistributions;
        	scope.avialableAmount = scope.paymentDatas[paymentIndex].availAmount; 
        	scope.formData.avialableAmount = scope.avialableAmount;
        	scope.formData.paymentId = paymentId;
        	scope.formData.locale= "en",
        	scope.formData.creditdistributions = scope.creditdistributions;
        	scope.avialableAmount=null;
        	resourceFactory.creditDistributionResource.get({clientId : routeParams.id},scope.formData,function(data){
        		location.path('/viewclient/'+routeParams.id);
        	});
        };
	  }
  });
  mifosX.ng.application.controller('CreditDistributionController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','HTValidationService','$route','$modal', mifosX.controllers.CreditDistributionController]).run(function($log) {
    $log.info("CreditDistributionController initialized");
  });
}(mifosX.controllers || {}));