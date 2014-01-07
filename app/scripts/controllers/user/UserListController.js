(function(module) {
  mifosX.controllers = _.extend(module, {
    UserListController: function(scope, resourceFactory,location) {
        scope.users = [];
        resourceFactory.userListResource.getAllUsers(function(data) {
            scope.users = data;
        });
        scope.routeTo = function(id){
            location.path('/viewuser/'+ id);
          };
        
    }
  });
  mifosX.ng.application.controller('UserListController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.UserListController]).run(function($log) {
    $log.info("UserListController initialized");
  });
}(mifosX.controllers || {}));
