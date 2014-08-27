(function(selfcare_module) {
	var hostName = window.location.hostname;
	var portNo = window.location.port;
	console.log(hostName+" "+portNo);
   selfcare.models = _.extend(selfcare_module, {
	   //return URL form after clients success
	   returnURL : "https://"+hostName+":"+portNo+"/Clientapp/myaccount/index.html#/active"
  });
}(selfcare.models || {}));
