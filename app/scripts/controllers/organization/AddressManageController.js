(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddressManageController: function(scope, resourceFactory,location,paginatorService) {

      scope.addressManages = [];
      scope.isTreeView = false;
      var idToNodeMap = {};

      scope.deepCopy = function (obj) {
          if (Object.prototype.toString.call(obj) === '[object Array]') {
            var out = [], i = 0, len = obj.length;
            for ( ; i < len; i++ ) {
              out[i] = arguments.callee(obj[i]);
            }
            return out;
          }
          if (typeof obj === 'object') {
            var out = {}, i;
            for ( i in obj ) {
              out[i] = arguments.callee(obj[i]);
            }
            return out;
          }
          return obj;
        };
        
        resourceFactory.addressManageResource.getAllAddresses(function(data){
        	 scope.addressManages = scope.deepCopy(data.pageItems);
        	
        	 var stateObject=[];
        	 var cityObject=[];
        	 var countryObject=[];
          for(var i in data.pageItems){
        	  
        	  countryObject.push({id:"-1"+data.pageItems[0].countryId,name:data.pageItems[0].countryName,children:[]}); 
        	 stateObject.push({id:"-2"+data.pageItems[i].stateId,name:data.pageItems[i].stateName,parentId:"-1"+data.pageItems[i].countryId,children:[]});
        	 cityObject.push({id:"-3"+data.pageItems[i].cityId,name:data.pageItems[i].cityName,parentId:"-2"+data.pageItems[i].stateId,children:[]});
          }
          
          
          var rootArray=[];
         stateObject=_.uniq(stateObject,function(item,key,id){
              return item.id;
          });
         countryObject=_.uniq(countryObject,function(item,key,id){
             return item.id;
         });
         cityObject=_.uniq(cityObject,function(item,key,id){
             return item.id;
         });
          console.log(cityObject);
          
          for(var i in countryObject){ 
            rootArray.push(countryObject[i]);
          }
                   
          for(var i in stateObject){
        	  
        	  rootArray.push(stateObject[i]);
           }
          for(var i in cityObject){ 
              rootArray.push(cityObject[i]);
           }
          
             for(var i in rootArray){
            	
                 idToNodeMap[rootArray[i].id] = rootArray[i];
             }
             
             function sortByParentId(a, b){
                 return a.parentId - b.parentId;
             }
             data.pageItems.sort(sortByParentId);
             var glAccountsArray = rootArray;
            
             var root = [];
            for(var i = 0; i < glAccountsArray.length; i++) {
            	 var currentObj = glAccountsArray[i];
                 if(currentObj.children){
                     currentObj.collapsed = "true";
                 }

               if(typeof currentObj.parentId === "undefined") {
                     root.push(currentObj);        
               } else {
            	   
                     parentNode = idToNodeMap[currentObj.parentId];
                     parentNode.children.push(currentObj);
               }
             }
            scope.treedata = root;
        });
        
        
        
        
        
      
      /*scope.addressManagesFetchFunction = function(offset, limit, callback) {
          resourceFactory.addressManageResource.getAllAddresses({offset: offset, limit: limit} , callback);
      };      
      scope.addressManages = paginatorService.paginate(scope.addressManagesFetchFunction, 14);
      
      scope.searchAddressManagesInputText = function(offset, limit, callback) {
    	  resourceFactory.addressManageResource.getAllAddresses({offset: offset, limit: limit , 
    		  sqlSearch: scope.filterText } , callback); 
          };
   		
   		scope.searchAddressManages = function(filterText) {
   			scope.addressManages = paginatorService.paginate(scope.searchAddressManagesInputText, 14);
   		};*/

    
     }
  });
  mifosX.ng.application.controller('AddressManageController', ['$scope', 'ResourceFactory','$location','PaginatorService', mifosX.controllers.AddressManageController]).run(function($log) {
    $log.info("AddressManageController initialized");
  });
}(mifosX.controllers || {}));
