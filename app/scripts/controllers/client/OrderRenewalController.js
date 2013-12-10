
(function(module) {
    mifosX.controllers = _.extend(module, {
        OrderRenewalController: function(scope,routeParams,resourceFactory, location) {
            scope.subscriptiondatas = [];
            scope.clientId=routeParams.clientId;  
            resourceFactory.OrderrenewalResourceTemplate.get(function(data) {
                scope.subscriptiondatas = data.subscriptiondata;
            });

    scope.submit = function() {
        resourceFactory.OrderrenewalResource.save({'orderId': routeParams.id},this.formData,function(data){
            location.path('/vieworder/'+data.resourceId+'/'+routeParams.clientId);
        });
    };
        }
    });
    mifosX.ng.application.controller('OrderRenewalController', ['$scope','$routeParams','ResourceFactory', '$location', mifosX.controllers.OrderRenewalController]).run(function($log) {
        $log.info("OrderRenewalController initialized");
    });
}(mifosX.controllers || {}));

