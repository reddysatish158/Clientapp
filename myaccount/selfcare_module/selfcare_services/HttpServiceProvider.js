(function (selfcare_module) {
    selfcare.services = _.extend(selfcare_module, {
        HttpServiceProvider: function () {
            var requestInterceptors = {};

            this.addRequestInterceptor = function (id, interceptorFn) {
                requestInterceptors[id] = interceptorFn;
            };

            this.removeRequestInterceptor = function (id) {
                delete requestInterceptors[id];
            };

            this.$get = ['$http', function (http) {
                var HttpService = function () {
                    var getConfig = function (config) {
                        return _.reduce(_.values(requestInterceptors), function (c, i) {
                            return i(c);
                        }, config);
                    };

                    var self = this;
                    _.each(['get', 'delete', 'head'], function (method) {
                        self[method] = function (url) {
                            var config = getConfig({
                                method: method.toUpperCase(),
                                url: url
                            });
                            return http(config);
                        };
                    });
                    _.each(['post', 'put'], function (method) {
                        self[method] = function (url, data) {
                            var config = getConfig({
                                method: method.toUpperCase(),
                                url: url,
                                data: data
                            });
                            return http(config);
                        };
                    });
                    this.setAuthorization = function (key) {
                        http.defaults.headers.common.Authorization = "Basic " + key;
                    };

                    this.cancelAuthorization = function () {
                        delete http.defaults.headers.common.Authorization;
                    };
                };
                return new HttpService();
            }];
        }
    });
    selfcare.ng.services.config(function ($provide) {
        $provide.provider('HttpService', selfcare.services.HttpServiceProvider);
    });
}(selfcare.services || {}));
