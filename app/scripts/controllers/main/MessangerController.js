(function(module) {
    mifosX.controllers = _.extend(module, {
    	MessangerController: function(scope,webStorage,resourceFactory,dateFilter) {
    		scope.userChatDatas=[];
    		 scope.first = {};
   		  scope.first.date = new Date();
   		  scope.appUserDatas=[];
   		// scope.formData=[];
   		  scope.first.time = scope.first.date.getHours()+":"+scope.first.date.getMinutes();
   		scope.minDate = new Date();
		  $('#timepicker1').timepicker({
			  showMeridian:false
		  });
    		
            resourceFactory.userChatResource.get({} , function(data) {
            	scope.userChatDatas = data.userChatDatas;
            	scope.appUserDatas=data.appUserDatas;
            });
            
            scope.saveMessage = function() {   
            	
            	this.formData.locale="en";
            	this.formData.dateFormat="dd MMMM yyyy";
            	this.formData.message=this.formData.note;
            	var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            	this.formData.messageDate=reqDate;
            	delete this.formData.note;
                resourceFactory.userChatResource.save({}, this.formData , function(data){
               /* var today = new Date();
                temp = { id: data.resourceId , note : scope.formData.note , createdByUsername : "test" , createdOn : today } ;
                scope.clientNotes.push(temp);
                scope.formData.note = "";
                scope.predicate = '-id';*/
              });
            }
            
        }
    });
    mifosX.ng.application.controller('MessangerController', ['$scope', 'webStorage','ResourceFactory','dateFilter', mifosX.controllers.MessangerController]).run(function($log) {
        $log.info("MessangerController initialized");
    });
}(mifosX.controllers || {}));

