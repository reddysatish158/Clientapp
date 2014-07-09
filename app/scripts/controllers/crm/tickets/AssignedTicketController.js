(function(module) {
  mifosX.controllers = _.extend(module, {
	  AssignedTicketController: function(scope,webStorage, routeParams, location,$modal, resourceFactory, paginatorService,PermissionService) {
       
		scope.openTickets = [];
        
        scope.routeToticket = function(id){
        	if(PermissionService.showMenu('READ_CLIENT'))
        		location.path('/viewclient/'+id);
        	webStorage.add("callingTab", {someString: "Tickets" });
        };
        
        scope.tabActive = function(){
      	   webStorage.add("callingTab", {someString: "Tickets" });
         };
        
        /**
         * functions
         * */
        scope.getOpenTickets = function () {
        	
    		scope.openTickets = paginatorService.paginate(scope.openTicketFetchFunction, 14);
        };
    
        scope.getclosedTickets = function () {
        
        	scope.openTickets = paginatorService.paginate(scope.closedTicketFetchFunction, 14);
        };
    
        scope.getWorkingTickets = function () {
        	
        	scope.openTickets = paginatorService.paginate(scope.workingTicketFetchFunction, 14);
        };
      
        scope.getOverDueTickets = function () {
        	
        	scope.openTickets = paginatorService.paginate(scope.overDueTicketFetchFunction, 14);
        };
        
        scope.getAssignedTickets = function () {
        	
        	scope.openTickets = paginatorService.paginate(scope.assignedTicketFetchFunction, 14);
        };
        
        
        /**
         * change query parameters here
         * statusType: 'Your Status type' do here if any changes needed to status type
         * */
        
        scope.openTicketFetchFunction = function(offset, limit, callback) {
        	
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OPEN'} , callback);
		};
		
		scope.closedTicketFetchFunction = function(offset, limit, callback) {
			
				resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'CLOSED'} , callback);
		};
		
		scope.workingTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'WORKING'} , callback);
		};
		
		scope.overDueTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'OVERDUE'} , callback);
		};
		
		scope.assignedTicketFetchFunction = function(offset, limit, callback) {
			
			resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit,statusType:'ASSIGNED'} , callback);
		};
		
		
		/**
		 * search function
		 * */
		scope.searchTickets = function(filterText) {
	  			scope.openTickets = paginatorService.paginate(scope.searchTickets123, 14);
	    };
        scope.searchTickets123 = function(offset, limit, callback) {
	    	  resourceFactory.getAllTicketResource.getAllDetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	    };
	    
	    /* <------------- Added by sarath on 26-jun-2014 */

  		scope.client = [];
        scope.offices = [];
        scope.bOfficeName = 'Head Office';
        scope.chartType = 'Days';
        scope.formData = {};
        
        scope.getWeek = function() {
            scope.formattedWeek = [];
            var checkDate = new Date();
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            var week = Math.floor(Math.round((time - checkDate) / 86400000) / 7);
            for(var i=0;i<12;i++)
            {
                if(week==0)
                {
                    week = 52;
                }
                scope.formattedWeek[i] = week - i;

            }
        };scope.getWeek();

        scope.getMonth = function(){
            var today = new Date();
            var aMonth = today.getMonth();
            scope.formattedMonth= [];
            var month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            for (var i=0; i<12; i++)
            {
                scope.formattedMonth.push(month[aMonth]);
                aMonth--;
                if (aMonth < 0)
                {
                    aMonth = 11;
                }
            }
        }; scope.getMonth();

        scope.getBarData = function(firstData,secondClientData,secondLoanData){
        	scope.BarData =[{"key": "All Tickets","values":[]},{"key": "Tickets Open","values":[]}];
        		for(var i=firstData.length-1;i>=0;i--){
        			scope.BarData[0].values.push([firstData[i],secondClientData[i]]);
        			scope.BarData[1].values.push([firstData[i],secondLoanData[i]]);
        		};
       	};
       	
       	scope.getFcount = function (dateData,retrievedDateData,responseData) {
            for(var i in dateData )
            {    scope.fcount[i] = 0;
                for(var j in retrievedDateData)
                {
                    if(dateData[i]==retrievedDateData[j])
                    {
                        scope.fcount[i]=responseData[j].count;

                    }
                }
            }
        };
        scope.getLcount = function (dateData,retrievedDateData,responseData) {
            for(var i in dateData )
            {    scope.lcount[i] = 0;
                for(var j in retrievedDateData)
                {
                    if(dateData[i]==retrievedDateData[j])
                    {
                        scope.lcount[i]=responseData[j].lcount;

                    }
                }
            }
        };
                
        scope.getFcount = function (retrievedDateData,responseData) {
                for(var j in retrievedDateData)
                {
                	scope.fcount[j] = 0;
                	scope.fcount[j]=responseData[j].tkt_cnt;
                }
        };
        scope.getLcount = function (retrievedDateData,responseData) {
                for(var j in retrievedDateData)
                {
                	scope.lcount[j] = 0;
                	scope.lcount[j]=responseData[j].tkt_cnt;
                }
        };

	 scope.id = this.officeId || 1;	
        resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id, genericResultSet:false} , function(data) {
            scope.client = data;
            scope.days = [];
            scope.tempDate = [];
            scope.fcount = [];
            for(var i in scope.client)
            {
                scope.days[i] = scope.client[i].days;
            }
            for(var i in scope.days)
            {
                var tday = scope.days[i][2];
                var tmonth = scope.days[i][1];
               // var tyear = scope.days[i][0];
                scope.tempDate[i] = tday + "/" + tmonth;
            }
            scope.getFcount(scope.tempDate,scope.client);
	 scope.id = this.officeId || 1;
            resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id, genericResultSet:false} , function(data) {
                scope.ldays = [];
                scope.ltempDate = [];
                scope.lcount = [];
                for(var i in data)
                {
                    scope.ldays[i] = data[i].days;
                }
                for(var i in scope.ldays)
                {
                    var tday = scope.ldays[i][2];
                    var tmonth = scope.ldays[i][1];
                    scope.ltempDate[i] = tday + "/" + tmonth;
                }
                scope.getLcount(scope.ltempDate,data);
                scope.getBarData(scope.ltempDate,scope.fcount,scope.lcount);
            });
        });

resourceFactory.groupTemplateResource.get(function(data) {scope.offices = data.officeOptions;});

/*Daily Data */
scope.getDailyData = function(){
    scope.chartType = 'Days';
    scope.id = this.officeId || 1;
    resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id, genericResultSet:false} , function(data) {
    	scope.client = data;
        scope.days = [];
        scope.tempDate = [];
        scope.fcount = [];
        for(var i in scope.offices){
            if(scope.offices[i].id == scope.id){
                scope.bOfficeName = scope.offices[i].name;
            }
        }
        for(var i in scope.client)
        {
            scope.days[i] = scope.client[i].days;
        }
        for(var i in scope.days)
        {
            var tday = scope.days[i][2];
            var tmonth = scope.days[i][1];
            scope.tempDate[i] = tday + "/" + tmonth;
        }
        scope.getFcount(scope.tempDate,scope.client);
        scope.id = this.officeId || 1;
        resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id, genericResultSet:false} , function(data) {
            scope.ldays = [];
            scope.ltempDate = [];
            scope.lcount = [];
            for(var i in data)
            {
                scope.ldays[i] = data[i].days;
            }
            for(var i in scope.ldays)
            {
                var tday = scope.ldays[i][2];
                var tmonth = scope.ldays[i][1];
                scope.ltempDate[i] = tday + "/" + tmonth;
            }
            scope.getLcount(scope.ltempDate,data);
            scope.getBarData(scope.ltempDate,scope.fcount,scope.lcount);
        }); 
    });
};

scope.getWeeklyData = function(){
    scope.chartType = 'Weeks';
    scope.id = this.officeId || 1;
    resourceFactory.runReportsResource.get({reportSource: 'TicketsByWeek',R_officeId:scope.id, genericResultSet:false} , function(data) {
        scope.client = data;
        scope.weeks = [];
        scope.fcount = [];

        for(var i in scope.offices){
            if(scope.offices[i].id == scope.id){
                scope.bOfficeName = scope.offices[i].name;
            }
        }
        for(var i in scope.client)
        {
            scope.weeks[i] = scope.client[i].Weeks;
        }

        scope.getFcount(scope.formattedWeek,scope.weeks,scope.client);
        scope.id = this.officeId || 1;
        resourceFactory.runReportsResource.get({reportSource: 'TicketsByWeek',R_officeId:scope.id, genericResultSet:false} , function(data) {
            scope.lweeks = [];
            scope.lcount = [];
            for(var i in data)
            {
                scope.lweeks[i] = data[i].Weeks;
            }
            scope.getLcount(scope.formattedWeek,scope.lweeks,data);
            scope.getBarData(scope.formattedWeek,scope.fcount,scope.lcount);
        });
    });
};

scope.getMonthlyData = function() {
    scope.chartType = 'Months';
    scope.id = this.officeId || 1;
    scope.formattedSMonth = [];
    var monthArray = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
    var today = new Date();
    var aMonth = today.getMonth();
    for (var i=0; i<12; i++)
    {
        scope.formattedSMonth.push(monthArray[aMonth]);
        aMonth--;
        if (aMonth < 0)
        {
            aMonth = 11;
        }
    }
    resourceFactory.runReportsResource.get({reportSource: 'TicketsByMonth',R_officeId:scope.id, genericResultSet:false} , function(data) {
        scope.client = data;
        scope.months = [];
        scope.fcount = [];

        for(var i in scope.offices){
            if(scope.offices[i].id == scope.id){
                scope.bOfficeName = scope.offices[i].name;
            }
        }
        for(var i in scope.client)
        {
            scope.months[i] = scope.client[i].Months;
        }
        scope.getFcount(scope.formattedMonth,scope.months,scope.client);
        scope.id = this.officeId || 1;
        resourceFactory.runReportsResource.get({reportSource: 'TicketsByMonth',R_officeId:scope.id, genericResultSet:false} , function(data) {
            scope.lmonths = [];
            scope.lcount = [];

            for(var i in data)
            {
                scope.lmonths[i] = data[i].Months;
            }
            scope.getLcount(scope.formattedMonth,scope.lmonths,data);
            scope.getBarData(scope.formattedSMonth,scope.fcount,scope.lcount);
        });
    });
};

var colorArray = ['#0f82f5', '#008000', '#808080', '#000000', '#FFE6E6'];
scope.colorFunction = function() {
    return function(d, i) {
        return colorArray[i];
    };
};



/* Added by sarath on 26-jun-2014 ----> */
	  		
        		
    }
  });
  mifosX.ng.application.controller('AssignedTicketController', ['$scope','webStorage', '$routeParams', '$location','$modal', 'ResourceFactory','PaginatorService','PermissionService', mifosX.controllers.AssignedTicketController]).run(function($log) {
    $log.info("AssignedTicketController initialized");
  });
}(mifosX.controllers || {}));


	
