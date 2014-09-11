(function(module) {
  mifosX.services = _.extend(module, {
    SessionManager: function(webStorage, httpService, resourceFactory,localStorageService) {
      var EMPTY_SESSION = {};

      this.get = function(data) {
        webStorage.add("sessionData", {userId: data.userId, authenticationKey: data.base64EncodedAuthenticationKey});
        httpService.setAuthorization(data.base64EncodedAuthenticationKey);
        return {user: new mifosX.models.LoggedInUser(data)};
      }

      this.clear = function() {
        webStorage.remove("sessionData");
        webStorage.remove("clientData");
        httpService.cancelAuthorization();
        return EMPTY_SESSION;
      };

      this.restore = function(handler) {
        var sessionData = webStorage.get('sessionData');
        if (sessionData !== null) {
          httpService.setAuthorization(sessionData.authenticationKey);
          resourceFactory.userResource.get({userId: sessionData.userId}, function(userData) {
            handler({user: new mifosX.models.LoggedInUser(userData)});
          });
        } else {
          handler(EMPTY_SESSION);
        }
      };
    }
  });
  mifosX.ng.services.service('SessionManager', [
    'webStorage',
    'HttpService',
    'ResourceFactory',
    'localStorageService',
    mifosX.services.SessionManager
  ]).run(function($log) {
    $log.info("SessionManager initialized");
  });
}(mifosX.services || {}));
