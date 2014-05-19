(function(module) {
  mifosX.controllers = _.extend(module, {
	  MediaController: function(scope, resourceFactory,location,PermissionService) {
        scope.media = [];
        scope.PermissionService = PermissionService;
        resourceFactory.mediaResource.getAllMedia(function(data) {
            scope.media= data;
        });
        scope.routeTo = function(mediaid){
            location.path('/viewmedia/'+ mediaid);
          };
    }
  });
  mifosX.ng.application.controller('MediaController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.MediaController]).run(function($log) {
    $log.info("MediaController initialized");
  });
}(mifosX.controllers || {}));
