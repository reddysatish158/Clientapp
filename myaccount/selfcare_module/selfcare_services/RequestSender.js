(function(selfcare_module) {
  selfcare.services = _.extend(selfcare_module, {
	  RequestSender: function() {
      var baseUrl = "" , apiVer = "/obsplatform/api/v1";
      this.setBaseUrl = function(url) {baseUrl = url;};
      this.$get = ['$resource','$rootScope', function(resource,$rootScope) {
        var defineResource = function(url, paramDefaults, actions) {
        	var tempUrl = baseUrl;
        	$rootScope.hostUrl = tempUrl;
          return resource(baseUrl + url, paramDefaults, actions);
        };
        return {
        	userResource: defineResource(apiVer + "/users/:userId", {userId : '@id'}, {}),
        	registrationResource: defineResource(apiVer + "/selfcare/register", {}, {
        		update : {method: 'PUT', params: {}}
        	}),
        	configurationResource:defineResource(apiVer + "/configurations",{}, {}),
        	addressTemplateResource: defineResource(apiVer + "/address/template/:city", {city:'@city'}, {}),
        	allocateHardwareDetails: defineResource(apiVer + "/itemdetails/:oneTimeSaleId/:quantity", {oneTimeSaleId:'@saleId',quantity:'@quantity'},{}),
        	clientResource: defineResource(apiVer + "/activationprocess/selfregistration", {}, {}),
        	orderTemplateResource: defineResource(apiVer + "/prices", {}, {}),
        	loginUser: defineResource(apiVer + "/selfcare/login", {username:'@username',password:'@password'}, {}),
        	clients: defineResource(apiVer + "/clients/:clientId", {clientId:'@clientId'}, {}),
        };
      }];
    }
  });
  selfcare.ng.services.config(function($provide) {
    $provide.provider('RequestSender', selfcare.services.RequestSender);
  });
}(selfcare.services || {}));
