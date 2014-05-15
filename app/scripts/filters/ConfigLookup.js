(function(module) {
    mifosX.filters = _.extend(module, {
        ConfigLookup: function ($http) {
        	
        	
            return function(input) {    
            	
            	var  configNameLookup = {

                   "payment":"true",
                   "IPTV":"false"
                	   //Segment
                 };


                  
                  return configNameLookup[input];};
          
        }
    });
    mifosX.ng.application.filter('ConfigLookup', ['$http',mifosX.filters.ConfigLookup]).run(function($log) {
        $log.info("ConfigLookup filter initialized");
    });
}(mifosX.filters || {}));
