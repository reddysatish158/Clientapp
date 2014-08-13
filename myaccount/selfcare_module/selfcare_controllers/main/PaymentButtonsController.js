(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  PaymentButtonsController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService) {
		  
		 rootScope.currentSession= {user :'billing'};
		 
		 var totalUrl = webStorage.get('planData');
		 if(totalUrl){
		  scope.dalpayURL = totalUrl.url;
		 }
		  
		 scope.selectedDalpay = function(){
			 if(totalUrl){
				  scope.dalpayURL = totalUrl.url;
			 }
		 };
		 scope.selectedPaypal = function(){
				 // scope.dalpayURL = null;
		 };
		/* $("#employeeLink").on("click",function(e) {
			 e.preventDefault(); // cancel the link itself
			 $.get(this.href,function(data) {
				 console.log(data);
			 });
		 });*/
		//scope.sendUrl = function(){ 
			
/*

			var url = "www.google.com?callback=JSON_CALLBACK";
				var responsePromise = http.jsonp( url ,
						{
							param : {
								p1 : "v1"
							}
						}
				            );

				responsePromise.success(function(data) {
				    // do something with the returned JavaScript object
				    // ( in the "data" parameter ).
					alert(data);
				});*/
			
			/*RequestSender.dalpayResource.get(function(data){
				console.log(data);
			});
			     */   
			/*delete http.defaults.headers.common['X-Obs-Platform-TenantId'];
			delete http.defaults.headers.common['Content-Type'];
			http.defaults.useXDomain = true;
			http.defaults.headers.put = {
			        'Access-Control-Allow-Origin': '*',
			        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			        'Access-Control-Allow-Headers': 'Content-Type'
			        };
	         http.get('http://www.google.com').then(function(data,error){
	            alert(data);
	            alert(error);
	            scope.days=data.data;
	          });*/
			
		  	//Set headers
		 /*http.get("https://secure.dalpay.is/cgi-bin/order2/processorder1.pl", {
   	      params: {
   	    	  mer_id: 999148,
   	    	  pageid : 1,
   	    	 num_items : 1,
   	    	 item1_desc : 'basic',
   	    	 item1_price : 20.00,
   	    	 item1_qty : 1
   	    	
   	      }
   	    }).then(function(data){
   	    	console.log(data);
   	      
   	    });*/
			/*function handleSuccess( response ) {
				 
				 console.log(response);
				  
			}
			 var request = http({
				 	method: "post",
				 	url: "https://secure.dalpay.is/cgi-bin/order2/processorder1.pl",
				 	params: {
				 		 mer_id: 999148,
			   	    	 pageid : 1,
			   	    	 num_items : 1,
			   	    	 item1_desc : 'basic',
			   	    	 item1_price : 20.00,
			   	    	 item1_qty : 1
				 	}
				 });
				  
				 request.then( handleSuccess, handleError );*/
			
			//$httpProvider.defaults.useXDomain = true;
		//	delete httpProvider.defaults.headers.common['X-Obs-Platform-TenantId'];
			//delete httpProvider.defaults.headers.common['Content-Type'];
			//selfcare.ng.application.config(function($httpProvider ) {
				/*console.log(http);
			  	//Set headers
			  	http.defaults.useXDomain = true;
			    delete http.defaults.headers.common['X-Obs-Platform-TenantId'];
			    delete http.defaults.headers.common['Content-Type'];*/

			  //}); 
			
			/*http.jsonp('https://secure.dalpay.is/cgi-bin/order2/processorder1.pl?callback=JSON_CALLBACK').success (function(data, status, headers, config) {
						  console.log(data);
							 
			});*/
			/*http.jsonp('https://secure.dalpay.is/cgi-bin/order2/processorder1.pl?num_items=1&item1_desc=aaa&item1_price=20.00&item1_qty=1&callback=JSON_CALLBACK')
			  .success (function(data) {
				  console.log(data);
			 
			  });*/
		//};
    }
  });
  selfcare.ng.application.controller('PaymentButtonsController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService', selfcare.controllers.PaymentButtonsController]);
}(selfcare.controllers || {}));
