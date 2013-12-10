(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddGRNController: function(scope, resourceFactory, location,dateFilter) {
        scope.itemDatas = [];
        scope.officeDatas = [];
        scope.supplierDatas = [];
        scope.formData = {};
        scope.formData.purchaseDate = new Date();
        
        resourceFactory.grntemplateResource.get(function(data) {
        	scope.itemDatas = data.itemData;
            scope.officeDatas = data.officeData;
            scope.supplierDatas = data.supplierData;
        });
        
                
        scope.submit = function() {
        	this.formData.locale = 'en';
        	var reqDate = dateFilter(scope.formData.purchaseDate,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.purchaseDate = reqDate;
            resourceFactory.grntemplateResource.save(this.formData,function(data){
            location.path('/viewgrn/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('AddGRNController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.AddGRNController]).run(function($log) {
    $log.info("AddGRNController initialized");
  });
}(mifosX.controllers || {}));
