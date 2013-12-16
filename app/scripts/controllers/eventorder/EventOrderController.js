(function(module) {
  mifosX.controllers = _.extend(module, {
	  EventOrderController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter) {

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
        //scope.datass = {};
        scope.start={};
        scope.start.date = new Date();
        resourceFactory.eventOrderTemplateResource.get({clientId : routeParams.id},function(data){
        	scope.devices = data.devices;
        	scope.events = data.events;
        	scope.optTypes = data.optType;
        	scope.codes = data.codes;
        });

        scope.submit = function() {
          this.formData.locale = "en";
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var adjustmentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.eventBookedDate = adjustmentDate;
          resourceFactory.eventOrderTemplateResource.save(this.formData, function(data){
            location.path('/viewclient/'+routeParams.id);
          });
        };

    }
  });
  mifosX.ng.application.controller('EventOrderController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter', mifosX.controllers.EventOrderController]).run(function($log) {
    $log.info("EventOrderController initialized");
  });
}(mifosX.controllers || {}));
