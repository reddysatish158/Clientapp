(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMediaController: function(scope, routeParams , location,resourceFactory,PermissionService ) {
        scope.media = [];
        scope.mediaDetails = [];
        scope.PermissionService = PermissionService;
        resourceFactory.saveMediaResource.get({mediaId: routeParams.id} , function(data) {
            scope.media = data.mediaAssetData;
            scope.mediaDetails=data.mediaassetAttributes;
            scope.mediaLocationDatas=data.mediaLocationData;
            scope.mediaAttributes=data.mediaAttributes;
            scope.mediaLanguageDatas=data.mediaLanguageData;
            scope.mediaTypeDatas=data.mediaTypeData;
            scope.mediaCategeorydatas=data.mediaCategeorydata;
           
        });

        scope.deletemedia = function (){
            resourceFactory.saveMediaResource.delete({mediaId: routeParams.id} , {} , function(data) {
                  location.path('/media');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewMediaController', ['$scope', '$routeParams', '$location','ResourceFactory','PermissionService', mifosX.controllers.ViewMediaController]).run(function($log) {
    $log.info("ViewMediaController initialized");
  });
}(mifosX.controllers || {}));
