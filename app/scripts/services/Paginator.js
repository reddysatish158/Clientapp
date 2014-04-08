(function(module) {
  mifosX.services = _.extend(module, {
    PaginatorService: function(scope, httpService) {
      
      this.paginate = function(fetchFunction, pageSize) {
              var paginator = {
              hasNextVar: false,
              nextVal : true,
              next: function() {
                if (this.hasNextVar) {
                  if(!(this.totalFilteredRecords % 15))
                	  if(this.currentOffset == (this.totalFilteredRecords -30))
                		  this.nextVal = false;
                  this.currentOffset += pageSize+1;
                  this._load();
                }
              },
              firstPage : function(){
            	  if(this.hasPrevious()) {
            		  this.nextVal = true;
            		  this.currentOffset = 0;
            		  this._load();
            	  }
              },
              lastPage :function(){
            	  if (this.hasNextVar) {
            		  if(this.totalFilteredRecords % 15){
            			  this.currentOffset = this.totalFilteredRecords - this.totalFilteredRecords % 15;
            		  }
            		  else{
            			  this.currentOffset = (this.totalFilteredRecords - this.totalFilteredRecords % 15)-15;
            			  this.nextVal = false;
            		  }
            		  this._load();
            	  }
              },
              _load: function() {
                  var self = this;
                  fetchFunction(this.currentOffset, pageSize + 1, function(items) {
                  self.totalFilteredRecords = items.totalFilteredRecords;
                  self.currentPageItems = items.pageItems;
                  if(self.nextVal)
                	  self.hasNextVar = items.pageItems.length === pageSize + 1;
                  else
                	  self.hasNextVar = false;
              });
              },
              hasNext: function() {
              return this.hasNextVar;
              },
              hasLastPage :function(){
            	  return this.hasNextVar;
              },
              hasFirstPage : function(){
            	  return this.currentOffset !==0;
              },
              previous: function() {
              if(this.hasPrevious()) {
              this.nextVal = true;
              this.currentOffset -= pageSize+1;
              this._load();
              }
              },
              hasPrevious: function() {
              return this.currentOffset !== 0;
              },
              currentPageItems: [],
              currentOffset: 0
              };
              // Load the first page
              paginator._load();
              return paginator;
        };

    }
  });
  mifosX.ng.services.service('PaginatorService', ['$rootScope', 'HttpService', mifosX.services.PaginatorService]).run(function($log) {
    $log.info("PaginatorService initialized");
  });
}(mifosX.services || {}));
