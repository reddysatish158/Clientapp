(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateClientControllerwizard: function(scope,routeParams, resourceFactory, location, http,filter, dateFilter,webStorage) {
		  
		  scope.header="Create Client";
		  scope.lists=[{name:"Create Client",id:"2"},{name:"One Time Sale",id:"3"},{name:"Allocation Order",id:"4"},{name:"Book Order",id:"5"}];
		  scope.no=0;
		  scope.nextcount=0;
		  scope.next=true;
		  scope.step1=true;
		  scope.step2=false;
		  scope.step3=false;
		  scope.step4=false;
		  scope.previous=false;
		  scope.ActivationData = {};
		  scope.ActivationData.client = [];
		  scope.ActivationData.sale = [];
		  scope.ActivationData.allocate = [];
		  scope.ActivationData.bookorder = [];
		  /*scope.ActivationData.clientDatas.push({
	            title: "Tab No:4 " ,
	            content: "Lores sum ep sum news test33333",
	            selected: true
	        });*/
		  var clientdata;
		  var onetime;
		  var allocation;
		  scope.nextStepmain=function(){
			  if(scope.nextcount<3){
			    scope.nextcount=scope.nextcount+1;
			    scope.previouscount=scope.nextcount;
			  }
			  if(scope.nextcount==1){
				  scope.previous=true;
				  scope.step1=false;
				  scope.step2=true;
				  scope.step3=false;
				  scope.step4=false;
			  	scope.header="One Time Sale";
			  	$("#progress").css({"display":"block","width":"25%"});
			  		scope.no=1;
			  	$("#progressno").css("top","-28.7px");
			  	$("ol li:eq(0)").removeClass( "ui-state-disabled" );
				 $("ol li:eq(1)").addClass("ui-state-highlight");
				  /*clientdata =webStorage.get("clientDetails");
				  
				  
			  	scope.clientTotalData=clientdata.clientDetails1;
			  	alert("data-->"+scope.clientTotalData);
			  	resourceFactory.clientResource.save(scope.clientTotalData,function(data){
			  		alert("haii");
			  	});
			  	webStorage.remove("clientDetails");*/
			  }
			  if(scope.nextcount==2){
				  scope.step1=false;
				  scope.step2=false;
				  scope.step3=true;
				  scope.step4=false;
				  	scope.header="Allocation Order";
				  	$("#progress").css({"display":"block","width":"50%"});
				  		scope.no=2;
				  	$("ol li:eq(1)").removeClass( "ui-state-disabled" );
					$("ol li:eq(1)").removeClass( "ui-state-highlight" );
					$("ol li:eq(2)").addClass("ui-state-highlight");
					/*onetime =webStorage.get("onetimesaleDetails");
					  webStorage.remove("onetimesaleDetails");
					  scope.clientonetimeData=onetime.onetimesaleDetails;
					  scope.id=onetime.clientid;
					  	alert("onetime"+scope.clientonetimeData);
					  	resourceFactory.oneTimeSaleResource.save({clientId:scope.id},scope.clientonetimeData,function(data){
			            	 alert("oneTimesucucess");
			          });*/
				  		
				}
			  if(scope.nextcount==3){
				  scope.step1=false;
				  scope.step2=false;
				  scope.step3=false;
				  scope.step4=true;
				  	scope.header="Book Order";
				  	$("#progress").css({"display":"block","width":"75%"});
				  		scope.no=3;
				  		$("ol li:eq(2)").removeClass( "ui-state-disabled" );
						 $("ol li:eq(2)").removeClass( "ui-state-highlight" );
						 $("ol li:eq(3)").addClass("ui-state-highlight");
						 scope.next=false;
						 scope.finish=true;
						 /*allocation =webStorage.get("allocationDetails");
						  webStorage.remove("allocationDetails");
						  scope.clienallocationData=allocation.allocationDetails;
						  
						  	alert("allocation"+scope.clienallocationData);
						  	
						  	resourceFactory.allocateHardwareResource.save(scope.clienallocationData,function(data){
				            	//temp1 = undefined; 
				            	alert("allocation sssssss");
				            });*/
				}
          };
		  
          
          scope.previousStepmain=function(){
				scope.next=true;
				scope.finish=false;
				
				if(scope.previouscount>=0){
				   scope.previouscount=scope.previouscount-1;
				   scope.nextcount=scope.nextcount-1;
				}
				
				if(scope.previouscount==2){
					scope.step4=false;
					scope.step3=true;
					
					scope.header="Allocation Order";
					$("ol li:eq(3)").removeClass("ui-state-highlight");
					$("ol li:eq(2)").addClass( "ui-state-highlight" );
					$("ol li:eq(2)").addClass( "ui-state-disabled" );
					$("#progress").css({"display":"block","width":"50%"});
					scope.no=2;
					$("#progressno").css("top","-28.7px");
				}
				
				if(scope.previouscount==1){
					scope.step3=false;
					scope.step2=true;
					
					scope.header="One Time Sale";
					$("ol li:eq(2)").removeClass("ui-state-highlight");
					$("ol li:eq(1)").addClass( "ui-state-highlight" );
					$("ol li:eq(1)").addClass( "ui-state-disabled" );
					$("#progress").css({"display":"block","width":"25%"});
					scope.no=1;
					$("#progressno").css("top","-28.7px");
				}
				if(scope.previouscount==0){
					scope.step2=false;
					scope.step1=true;
					
					scope.header="CreateClient";
					$("ol li:eq(1)").removeClass("ui-state-highlight");
					$("ol li:eq(0)").addClass( "ui-state-disabled" );
					$("#progress").css({"display":"none","width":"0%"});
					scope.no=0;
					$("#progressno").css("top","6.5px");
					
					scope.previous=false;
				}
			}
          
          scope.anchor1=function(){
			   
			  scope.header="Create Client";
			  $("#progress").css({"display":"none","width":"0%"});
				scope.no=0;
				$("#progressno").css("top","6.5px");
				$("ol li:eq(0)").addClass( "ui-state-disabled" );
				$("ol li:eq(1)").removeClass("ui-state-highlight");
				$("ol li:eq(1)").addClass( "ui-state-disabled" );
				$("ol li:eq(2)").removeClass("ui-state-highlight");
				$("ol li:eq(2)").addClass( "ui-state-disabled" );
				$("ol li:eq(3)").removeClass("ui-state-highlight");
				$("ol li:eq(3)").addClass( "ui-state-disabled" );
			  scope.nextcount=0;
			  scope.next=true;
			  scope.step1=true;
			  scope.step2=false;
			  scope.step3=false;
			  scope.step4=false;
			  scope.previous=false;
			  scope.finish=false;
			  
		  };
		  scope.anchor2=function(){
			  
			  scope.previous=true;
			  scope.next=true;
			  scope.finish=false;
			  scope.step1=false;
			  scope.step2=true;
			  scope.step3=false;
			  scope.step4=false;
			  scope.header="One Time Sale";
			  	$("#progress").css({"display":"block","width":"25%"});
			  		scope.no=1;
			  	$("#progressno").css("top","-28.7px");
			  	$("ol li:eq(0)").removeClass( "ui-state-disabled" );
				$("ol li:eq(1)").addClass("ui-state-highlight");
				$("ol li:eq(1)").addClass( "ui-state-disabled" );
				$("ol li:eq(2)").addClass( "ui-state-disabled" );
				$("ol li:eq(3)").addClass( "ui-state-disabled" );
				$("ol li:eq(2)").removeClass("ui-state-highlight");
				$("ol li:eq(3)").removeClass("ui-state-highlight");
			  scope.nextcount=1;
			  scope.previouscount=1;
			  
			  
		  };
		  scope.anchor3=function(){
			  anchorclick=1;
			  scope.previous=true;
			  scope.next=true;
			  scope.finish=false;
			  scope.step1=false;
			  scope.step2=false;
			  scope.step3=true;
			  scope.step4=false;
			  	scope.header="Allocation Order";
			  	$("#progress").css({"display":"block","width":"50%"});
			  		scope.no=2;
			  	$("ol li:eq(0)").removeClass( "ui-state-disabled" );
			  	$("ol li:eq(1)").removeClass( "ui-state-disabled" );
				$("ol li:eq(1)").removeClass( "ui-state-highlight" );
				$("ol li:eq(1)").removeClass("ui-state-highlight");
			    $("ol li:eq(2)").addClass( "ui-state-highlight" );
				$("ol li:eq(2)").addClass( "ui-state-disabled" );
				$("ol li:eq(3)").removeClass("ui-state-highlight");
				$("ol li:eq(3)").addClass( "ui-state-disabled" );
			  scope.nextcount=2;
			  scope.previouscount=2;
			  
		  };
		  
		  
//create client controller
          scope.offices = [];
          scope.staffs = [];
          scope.first = {};
          scope.first.date = new Date();
          scope.formData1 = {};
          scope.clientCategoryDatas=[];
          scope.configurationProperty=[];
         
          
          resourceFactory.clientTemplateResource.get(function(data) {
              scope.offices = data.officeOptions;
              scope.staffs = data.staffOptions;
              scope.formData1.officeId = scope.offices[0].id;
              scope.clientCategoryDatas=data.clientCategoryDatas;
              scope.cities=data.addressTemplateData.cityData;
              scope.configurationProperty=data.configurationProperty.enabled;
              scope.formData1.clientCategory=scope.clientCategoryDatas[0].id;
          });
          
         
          scope.changeOffice =function(officeId) {
            resourceFactory.clientTemplateResource.get({staffInSelectedOfficeOnly : false, officeId : officeId
                }, function(data) {
              scope.staffs = data.staffOptions;
             
            });
          };

        /*  $("#city").change(function(){
          	
          	resourceFactory.AddressTemplateResource.get({city : scope.formData1.city}, function(data) {
          		scope.formData1.state = data.state;
          		scope.formData1.country = data.country;
           
          });
          });*/
          $("#city").change(function(){
        	  alert(scope.formData1.city);
          	resourceFactory.AddressTemplateResource.get({city : scope.formData1.city}, function(data) {
          		scope.formData1.state = data.state;
          		scope.formData1.country = data.country;
           
          });
          });
          scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData1.state = data.state;
            		scope.formData1.country = data.country;
        	  });
          };
          scope.onFileSelect = function($files) {
            scope.file = $files[0];
          };
          scope.setChoice = function(){
              if(this.formData1.active){
                  scope.choice = 1;
              }
              else if(!this.formData1.active){
                  scope.choice = 0;
              }
          };
          scope.submit1 = function() {/*
          	//alert("submit");
              var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
              this.formData1.locale = 'en';
              this.formData1.active = true;
              this.formData1.dateFormat = 'dd MMMM yyyy';
              this.formData1.activationDate = reqDate;
              this.formData1.flag=scope.configurationProperty;
              
              //webStorage.add("clientDetails",{clientDetails1:this.formData1});
              
            */};
		  
		  
//onetimsale controller
			  scope.clientId=routeParams.id;
			  scope.formData4 = {};
	          scope.data={};
	          scope.maxDate = new Date();
	          
	        resourceFactory.oneTimeSaleTemplateResource.getOnetimes({clientId: routeParams.id}, function(data) {
	        	scope.itemDatas = data.itemDatas;
	            scope.discountMasterDatas = data.discountMasterDatas;
	            scope.formData4.discountId = scope.discountMasterDatas[0].discountMasterId;
	            scope.onetimesales=data;
	            scope.date= {};
	            scope.date.saleDate = new Date();
	            
	        });
	        scope.itemData=function(itemId){
	        	//alert(itemId);
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
	        		
	        		scope.formData4=data;
	        		scope.formData4.itemId=itemId;
	        		scope.formData4.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		
		        });	
	        }
	        scope.itemDataQuantity=function(quantity,itemId){
	        	this.data.unitPrice=this.formData4.unitPrice;
	        	this.data.locale="en";
	        	this.data.quantity=quantity;
	        	//alert(itemId);
	        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},this.data, function(data) {
	        		scope.formData4=data;
	        		scope.formData4.quantity=quantity;
	        		scope.formData4.itemId=itemId;
	        		
		        });	
	        }
	        scope.submit2 = function() {/*  
	        	 this.formData4.locale = "en";
	             this.formData4.dateFormat = "dd MMMM yyyy";
	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	             this.formData4.saleDate=actDate;
	             delete this.formData4.discountMasterDatas;   
	             delete this.formData4.warranty;
	             delete this.formData4.itemDatas;
	             delete this.formData4.units;
	             delete this.formData4.itemCode;
	             delete this.formData4.id;
	             
	             //webStorage.add("onetimesaleDetails",{onetimesaleDetails:this.formData4,clientid:routeParams.id});
	            
	        */};
//allocation  controller
			  scope.formData2 = {};
			  scope.clientId=routeParams.clientId;
			 /* resourceFactory.allocateHardwareDetails.getItemDetails({oneTimeSaleId:scope.formData4.itemId}, function(data) {
	 	          scope.formData2=data;
	 	    });*/ 
			 
			  
	        scope.getData = function(query){
	        	if(query.length>0){
	        		resourceFactory.allocateHardwareDetails.getSerialNumbers({oneTimeSaleId:scope.formData4.itemId,query: query}, function(data) { 	        	
	     	            scope.itemDetails = data.serials;
	     	          
	     	        }); 
	        	}else{
	            	
	        	}
            }
	        scope.getNumber = function(num) {
	             return new Array(num);   
	         };
	        scope.submit3 = function() {/*  
	        	alert('allocate');
	        	var temp1 = new Array();
	        
	        	$("input[name='serialNumber']").each(function(){
	        		var temp = {};
	    			temp["serialNumber"] = $(this).val();
	    			temp["orderId"] = routeParams.id;
	    			temp["clientId"] = routeParams.clientId;
	    			temp["status"] = "allocated";
	    			temp["itemMasterId"] = scope.formData2.itemMasterId;
	    			  
	    			temp["isNewHw"]="Y";
	    			temp1.push(temp);
	        	});
	        
	        	
	            this.formData2.serialNumber=temp1;
	           
	          
	           // webStorage.add("allocationDetails",{allocationDetails:this.formData2});
	           
	           // temp1 = undefined;
	            console.log("asjhj");
	            
	        */};
          
  //createorder controller
	        scope.plandatas = [];
	        scope.subscriptiondatas=[];
	        scope.paytermdatas=[];
	        scope.start = {};
	        scope.start.date = new Date();
	        scope.sortingOrder = 'planCode';
	        scope.reverse = false;
	        scope.filteredItems = [];
	        scope.prepaidPalnfilteredItems = [];
	        scope.groupedItems = [];
	        scope.itemsPerPage =6;
	        scope.pagedItems = [];
	        scope.prepaidPlanspagedItems = [];
	        scope.currentPage = 0;
	        scope.items =[];
	        scope.formData3 =[];
	       
	        resourceFactory.orderTemplateResource.get(function(data) {
	        	 
	          scope.plandatas = data.plandata;
	          scope.items = data.plandata;
	          scope.prepaidPlansitems = data.plandata;
	        //  scope.formData3=data;
	          scope.subscriptiondatas=data.subscriptiondata;
	          scope.paytermdatas=data.paytermdata;
	          scope.clientId = routeParams.id;
	      
	          scope.formData3 = {
	            		billAlign: false,
	            		
	                  };
	     	   
	            scope.filteredItems = filter('filter')(scope.items, function (item) {
	                for(var attr in item) {
	                    if (searchMatch(item[attr], scope.query))
	                        return true;
	                }
	                return false;
	            });
	            
	            scope.prepaidPalnfilteredItems = filter('filter')(scope.prepaidPlansitems, function (prepaidPlansitem) {
	                for(var attr in prepaidPlansitem) {
	                	
	                    if (searchMatch1(prepaidPlansitem[attr], scope.query))
	                        return true;
	                }
	                
	                return false;
	               
	            });
	            
	            if (scope.sortingOrder !== '') {
	                scope.filteredItems =filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
	           }
	            
	            if (scope.sortingOrder !== '') {
	                scope.filteredItems =filter('orderBy')(scope.prepaidPalnfilteredItems, scope.sortingOrder, scope.reverse);
	           }
	            scope.currentPage = 0;
	            scope.groupToPages();
	            scope.groupToprepaidPages();
	            scope.pagedItems = [];
	            for (var i = 0; i < scope.filteredItems.length; i++) {
	                if (i % scope.itemsPerPage === 0) {
	                    scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.filteredItems[i] ];
	                } else {
	                    scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
	                }
	            }
	            
	            scope.prepaidPlanspagedItems = [];
	            
	            for (var i = 0; i < scope.prepaidPalnfilteredItems.length; i++) {
	            	
	            	
	                if (i % scope.itemsPerPage === 0) {
	                    scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.prepaidPalnfilteredItems[i] ];
	                } else {
	                    scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.prepaidPalnfilteredItems[i]);
	                }
	            }
	           
	        });
	        
	        scope.setBillingFrequency = function(value) {
	        	scope.paytermdatas=undefined;
	        	 resourceFactory.orderResource.get({planId:value, template: 'true'} , function(data) {
	        		 
	        		 scope.paytermdatas=data.paytermdata;
	        		
	        		 scope.formData3.isPrepaid=data.isPrepaid;
	        		 scope.formData3.planCode=value;
	        		 
	        		  for (var i in data.subscriptiondata) {
	                 	
	                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
	                 		 scope.formData3.contractPeriod=data.subscriptiondata[i].id; 
	                 	}
	                   
	                  };
	             });
	       };
	        
	       var searchMatch = function (haystack, needle) {
	           if (!needle) {
	               return true;
	           }
	          
	           return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	       };
	       
	       var searchMatch1 = function (haystack, needle) {
	           if (!needle) {
	               return true;
	           }
	          
	           return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	       };

	       // init the filtered items
	       scope.search = function () {
	    	   
	           scope.filteredItems = filter('filter')(scope.items, function (item) {
	        	   
	               for(var attr in item) {
	            	  
	                   if (searchMatch(item[attr], scope.query))
	                       return true;
	               }
	               return false;
	           });
	           // take care of the sorting order
	         //  if (scope.sortingOrder !== '') {
	               scope.filteredItems =filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
	          // }
	           scope.currentPage = 0;
	           // now group by pages
	           scope.groupToPages();
	       };
	       
	       // calculate page in place
	       scope.groupToPages = function () {
	           scope.pagedItems = [];
	           
	           for (var i = 0; i < scope.filteredItems.length; i++) {
	               if (i % scope.itemsPerPage === 0) {
	                   scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.filteredItems[i] ];
	               } else {
	                   scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
	               }
	           }
	       };
	       
	       scope.groupToprepaidPages = function () {
	           scope.prepaidPlanspagedItems = [];
	           
	           for (var i = 0; i < scope.prepaidPalnfilteredItems.length; i++) {
	               if (i % scope.itemsPerPage === 0) {
	                   scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.prepaidPalnfilteredItems[i] ];
	               } else {
	                   scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.prepaidPalnfilteredItems[i]);
	               }
	           }
	       };
	       
	       scope.range = function (start, end) {
	           var ret = [];
	           if (!end) {
	               end = start;
	               start = 0;
	           }
	           for (var i = start; i < end; i++) {
	               ret.push(i);
	           }
	           return ret;
	       };
	       
	       scope.prevPage = function () {
	           if (scope.currentPage > 0) {
	               scope.currentPage--;
	           }
	       };
	       
	       scope.nextPage = function () {
	           if (scope.currentPage < scope.pagedItems.length - 1) {
	               scope.currentPage++;
	           }
	       };
	       
	       scope.setPage = function () {
	           scope.currentPage = this.n;
	       };

	       // functions have been describe process the data for display
	       scope.search();

	       // change sorting order
	       scope.sort_by = function(newSortingOrder) {
	           if (scope.sortingOrder == newSortingOrder)
	               scope.reverse = !scope.reverse;

	           scope.sortingOrder = newSortingOrder;

	           // icon setup
	           $('th i').each(function(){
	               // icon reset
	               $(this).removeClass().addClass('icon-sort');
	           });
	           if (scope.reverse)
	               $('th.'+'planCode'+' i').removeClass().addClass('icon-chevron-up');
	           else
	               $('th.'+'planCode'+' i').removeClass().addClass('icon-chevron-down');
	       };
	        scope.submit4 = function() {   
	        	
	        	this.formData3.locale = 'en';
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData3.dateFormat = 'dd MMMM yyyy';
	            this.formData3.start_date = reqDate;
	            if(this.formData3.isPrepaid == 'Y'){
	            this.formData3.paytermCode='Monthly';
	            }
	            delete this.formData3.planId;
	            delete this.formData3.id;
	            delete this.formData3.isPrepaid;
	           
	            
	            	scope.ActivationData = {};
	      		  scope.ActivationData.client = [];
	      		  scope.ActivationData.sale = [];
	      		  scope.ActivationData.allocate = [];
	      		  scope.ActivationData.bookorder = [];
	              	//alert("submit");
	                  var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	                  this.formData1.locale = 'en';
	                  this.formData1.active = true;
	                  this.formData1.dateFormat = 'dd MMMM yyyy';
	                  this.formData1.activationDate = reqDate;
	                  this.formData1.flag=scope.configurationProperty;
	                  
	                  
	 	        	 this.formData4.locale = "en";
	 	             this.formData4.dateFormat = "dd MMMM yyyy";
	 	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	 	             this.formData4.saleDate=actDate;
	 	             delete this.formData4.discountMasterDatas;   
	 	             delete this.formData4.warranty;
	 	             delete this.formData4.itemDatas;
	 	             delete this.formData4.units;
	 	             delete this.formData4.itemCode;
	 	             delete this.formData4.id;
	 	             
	 	            
	 	        	
	 	        	var temp1 = new Array();
	 	        
	 	        	$("input[name='serialNumber']").each(function(){
	 	        		var temp = {};
	 	    			temp["serialNumber"] = $(this).val();
	 	    			temp["orderId"] = routeParams.id;
	 	    			temp["clientId"] = routeParams.clientId;
	 	    			temp["status"] = "allocated";
	 	    			temp["itemMasterId"] = scope.formData4.itemId;
	 	    			  
	 	    			temp["isNewHw"]="Y";
	 	    			temp1.push(temp);
	 	        	});
	 	        
	 	        	 scope.formData2.itemMasterId=scope.formData4.itemId;
	 				  scope.formData2.quantity=1;
	 	            this.formData2.serialNumber=temp1;
	 	           
	 	          
	 	           // webStorage.add("allocationDetails",{allocationDetails:this.formData2});
	 	           
	 	           // temp1 = undefined;
	 	            console.log("asjhj");
	 	            
	 	        
	 	             //webStorage.add("onetimesaleDetails",{onetimesaleDetails:this.formData4,clientid:routeParams.id});
	 	            
	 	        
	                  //webStorage.add("clientDetails",{clientDetails1:this.formData1});
	                  
	                
	            	 scope.ActivationData.bookorder.push(this.formData3);
	 	            scope.ActivationData.allocate.push(this.formData2);
	 	            scope.ActivationData.sale.push(this.formData4);
	 	             scope.ActivationData.client.push(this.formData1);
	 	            delete this.formData2.serials;
	 	            delete this.formData4.pageItems;
	 	            delete this.formData4.totalFilteredRecords;
	            resourceFactory.activationProcessResource.save(scope.ActivationData,function(data){
	            	
	            	  location.path('/viewclient/' + data.resourceId);
	            });
	            
	            /*resourceFactory.saveOrderResource.save({'clientId': routeParams.id},this.formData3,function(data){
	            	
	            location.path('/vieworder/' + data.resourceId+'/'+routeParams.id);
	          });*/
	        };
    	  
		  
	
    }
  });
  mifosX.ng.application.controller('CreateClientControllerwizard', ['$scope', '$routeParams','ResourceFactory', '$location', '$http','$filter', 'dateFilter','webStorage', mifosX.controllers.CreateClientControllerwizard]).run(function($log) {
    $log.info("CreateClientControllerwizard initialized");
  });
}(mifosX.controllers || {}));
