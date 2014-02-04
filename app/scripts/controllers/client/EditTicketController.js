(function(module) {
	mifosX.controllers = _.extend(module,{
		EditTicketController : function(scope,webStorage,routeParams,resourceFactory, location, http,API_VERSION,$rootScope) {
							scope.formData = {};	
							scope.data={};
							var clientData = webStorage.get('clientData');
						    scope.displayName=clientData.displayName;
						    scope.statusActive=clientData.statusActive;
						    scope.accountNo=clientData.accountNo;
						    scope.officeName=clientData.officeName;
						    scope.balanceAmount=clientData.balanceAmount;
						    scope.currency=clientData.currency;
						    scope.imagePresent=clientData.imagePresent;
						    scope.categoryType=clientData.categoryType;
					        scope.email=clientData.email;
					        scope.phone=clientData.phone;
							resourceFactory.editTicketResource.get({clientId: routeParams.clientId, id: routeParams.id} , function(data) {	
                                scope.formData=data;                            
								scope.statusTypes = data.statusType;
								scope.usersData = data.usersData;
								//scope.formData.status=14;
								scope.clientId=routeParams.clientId;
								scope.ticketId=routeParams.id;
							});		
							
							scope.onFileSelect = function($files) {
							        scope.file = $files[0];
							      };
							      
							scope.submit = function() {
								this.data.assignedTo=this.formData.userId;
								this.data.comments=this.formData.comments;
								this.data.status=this.formData.status;
						        http.uploadFile({
						          url: $rootScope.hostUrl+ API_VERSION +'/clients/'+routeParams.clientId+'/documents/'+routeParams.id+'/attachment', 
						          data: scope.data,
						          file: scope.file
						        }).then(function(data) {
						        	if (!scope.$$phase) {
						                scope.$apply();
						              }
						        	location.path('/viewTicket/'
											+ routeParams.clientId+'/'+routeParams.id);
						        });						      				
							};
						}
					});
	mifosX.ng.application.controller('EditTicketController', ['$scope','webStorage' ,'$routeParams', 'ResourceFactory', '$location', '$http','API_VERSION','$rootScope', mifosX.controllers.EditTicketController]).run(function($log) {
	    $log.info("EditTicketController initialized");
	  });
	
}(mifosX.controllers || {}));