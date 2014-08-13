(function(selfcare_module) {
	selfcare.filters = _.extend(selfcare_module, {
        DateFormat: function (dateFilter,webStorage) {
            return function(input) {
                if(input){
                    var tDate = new Date(input);
                    return dateFilter(tDate,'dd MM yyyy');
                }

            };
        }
    });
    selfcare.ng.application.filter('DateFormat', ['dateFilter','webStorage',selfcare.filters.DateFormat]);
}(selfcare.filters || {}));
