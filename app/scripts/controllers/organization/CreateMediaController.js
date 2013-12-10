(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateMediaController: function(scope, resourceFactory, location,dateFilter) {
        scope.mediaAttributes = [];
        scope.mediaCategeorydatas = [];
        scope.mediaFormats = [];
        scope.mediaLanguageDatas =[];
        scope.mediaStatus = [];
        scope.mediaTypeDatas = [];
        scope.mediaassetAttributes=[];
        scope.mediaAssetLocations=[];
        scope.attributesFormData={};
        scope.mediaLocationFormData={};
        scope.release= {};
        scope.release.date = new Date();
        resourceFactory.mediaTemplateResource.get(function(data) {
            scope.mediaAttributes = data.mediaAttributes;
            scope.mediaCategeorydatas = data.mediaCategeorydata;
            scope.mediaFormats = data.mediaFormat;
            scope.mediaLanguageDatas = data.mediaLanguageData;
            scope.mediaStatus = data.mediaStatus;
            scope.mediaTypeDatas = data.mediaTypeData;
            scope.attributesFormData.attributeType="Cast";
            scope.formData = {
           
              
            };
        });
        scope.addMedia = function () {
        	if (scope.attributesFormData.attributeName && scope.attributesFormData.attributevalue) {
              scope.mediaassetAttributes.push({attributeType:scope.attributesFormData.attributeType, attributeName:scope.attributesFormData.attributeName, 
            	  attributevalue:scope.attributesFormData.attributevalue, attributeNickname:scope.attributesFormData.attributeNickname,attributeImage:scope.attributesFormData.attributeImage});
            //alert(mediaassetAttributes.attributeName);
            //  scope.attributesFormData.attributeType ="Cast";
              scope.attributesFormData.attributeName = undefined;
              scope.attributesFormData.attributevalue = undefined;
              scope.attributesFormData.attributeNickname = undefined;
              scope.attributesFormData.attributeImage = undefined;
        	}
          };
          
          scope.addMediaLocation = function () {
          //	if (scope.mediaLocationFormData.languageId && scope.mediaLocationFormData.location) {
                scope.mediaAssetLocations.push({languageId:scope.mediaLocationFormData.languageId, location:scope.mediaLocationFormData.location, 
                	formatType:scope.mediaLocationFormData.formatType});
              
                scope.mediaLocationFormData.languageId = undefined;
                scope.mediaLocationFormData.location = undefined;
                scope.mediaLocationFormData.formatType = undefined;
                
          	//}
            };
		
          
          scope.deleteMedia = function (index) {
              scope.mediaassetAttributes.splice(index,1);
            };
            
            scope.removeMediaLocation = function (index) {
                scope.mediaAssetLocations.splice(index,1);
              };
            
        scope.submit = function() {   
        	 this.formData.locale = 'en';
         	var reqDate = dateFilter(scope.release.date,'dd MMMM yyyy');
             this.formData.dateFormat = 'dd MMMM yyyy';
             this.formData.releaseDate = reqDate;
             scope.formData.mediaAssetLocations =new Array();
             scope.formData.mediaassetAttributes =new Array();
             if (scope.mediaassetAttributes.length > 0) {
              
                 for (var i in scope.mediaassetAttributes) {
                   scope.formData.mediaassetAttributes.push({attributeType:scope.mediaassetAttributes[i].attributeType,attributeName:scope.mediaassetAttributes[i].attributeName, 
                	   attributevalue:scope.mediaassetAttributes[i].attributevalue,attributeNickname:scope.mediaassetAttributes[i].attributeNickname,
                	   attributeImage:scope.mediaassetAttributes[i].attributeImage});
                 };
               }
             
             if (scope.mediaAssetLocations.length > 0) {
                
                 for (var i in scope.mediaAssetLocations) {
                	
                   scope.formData.mediaAssetLocations.push({languageId:scope.mediaAssetLocations[i].languageId,formatType:scope.mediaAssetLocations[i].formatType, 
                	   location:scope.mediaAssetLocations[i].location});
                 };
               }
             
            resourceFactory.saveMediaResource.save(this.formData,function(data){
            location.path('/viewmedia/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateMediaController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreateMediaController]).run(function($log) {
    $log.info("CreateMediaController initialized");
  });
}(mifosX.controllers || {}));
