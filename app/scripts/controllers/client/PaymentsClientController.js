(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentsClientController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,validator) {

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
        //scope.datass = {};
        scope.start={};
         scope.start.date = new Date();
         scope.maxDate= scope.start.date;
         scope.minDate= scope.start.date;
         
        resourceFactory.paymentsTemplateResource.getPayments(function(data){
        	scope.payments = data;
            scope.data = data.data;
          scope.paymentTypeData=function(value){
            	scope.selectvalue=value;
            	for(var i=0;i<scope.data.length;i++){
            		
            		if(scope.data[i].id==value){
            			scope.paymentType=scope.data[i].mCodeValue;
            		}
            	}
            };
        //  scope.formData.destinationOfficeId = scope.offices[0].id;  
        });
        
        function invalidDate(validDate) {
     	   var dateForm=new Date();
     		 var ddate = validDate.substring(0,2);
              var dmonth = validDate.substring(3,5)-1;
              var dyear = validDate.substring(6);
              var todayyear=dateForm.getFullYear();
              var todaymonth=dateForm.getMonth();
              var todaydate=dateForm.getDate();
              return !((ddate<=todaydate) && (dmonth<=todaymonth) && (dyear<=todayyear));
     }

        
        function parameterValidationErrors() {
        	scope.errorDetailscust = [];
        	var validDate=invalidDate(scope.validDate);
        	if(scope.selectvalue==undefined){
        		scope.validerror=false;
        		 var fieldId="#paymenttypeval";
        		 $(fieldId).addClass("validationerror");
        		 var errorObj = new Object();
        		 errorObj.field = "paymenttypeval";
        		 errorObj.code = 'error.message.paymenttypeval.required';
        		 errorObj.args = {params:[]};
        		 errorObj.args.params.push({value : "paymenttypevalue"});
                 scope.errorDetailscust.push(errorObj);
        		
        	}
        	if(scope.amountvalue==undefined||scope.amountvalue==""){
        		scope.validerror=false;
        		 var fieldId="#amountPaid";
        		 $(fieldId).addClass("validationerror");
        		 var errorObj = new Object();
        		 errorObj.field = "amountPaid";
        		 errorObj.code = 'error.message.amountval.required';
        		 errorObj.args = {params:[]};
        		 errorObj.args.params.push({value : "amountvalue"});
                 scope.errorDetailscust.push(errorObj);
        		
        	}

        	if(scope.receiptalue==undefined||scope.receiptalue==""){


        		scope.validerror=false;
        		 var fieldId="#receiptNo";
        		 $(fieldId).addClass("validationerror");
        		 var errorObj = new Object();
        		 errorObj.field = "receiptNo";
        		 errorObj.code = 'error.message.receiptNo.required';
        		 errorObj.args = {params:[]};
        		 errorObj.args.params.push({value : "receiptNo"});
                 scope.errorDetailscust.push(errorObj);
        		
        	}
        	if(validDate==true){
        		scope.validerror=false;
        		 var fieldId="#dateid";
        		 $(fieldId).addClass("validationerror");
        		 var errorObj = new Object();
        		 errorObj.field = "dateid";
        		 errorObj.code = 'error.message.futuredate.required';
        		 errorObj.args = {params:[]};
        		 errorObj.args.params.push({value : "futuredate"});
                 scope.errorDetailscust.push(errorObj);
        		
        	}
        }
        
        function removeErrors() {
            var $inputs = $(':input');
            $inputs.each(function() {
                $(this).removeClass("validationerror");
            });
          }

        scope.dbClick = function(){
        	return false;
        };
        
        scope.submit = function() {

        	scope.amountvalue=this.formData.amountPaid;
        	scope.receiptalue=this.formData.receiptNo;
        	scope.validDate = dateFilter(scope.start.date,'dd-MM-yyyy');
        	scope.errorDetailscust = [];
            removeErrors();
            parameterValidationErrors();
          this.formData.locale = "en";
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.paymentDate= paymentDate;
          var res1 = validator.validateZipCode(scope.formData.receiptNo);
          if (scope.errorDetailscust.length == 0) {
        	  scope.flag = true;
          resourceFactory.paymentsResource.save({clientId : routeParams.id}, this.formData, function(data){
            location.path('/viewclient/'+routeParams.id);
          },function(errData){
        	  scope.validerror=true;
        	  scope.flag = false;
          });
          }
        };

    }
  });
  mifosX.ng.application.controller('PaymentsClientController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','HTValidationService', mifosX.controllers.PaymentsClientController]).run(function($log) {
    $log.info("PaymentsClientController initialized");
  });
}(mifosX.controllers || {}));
