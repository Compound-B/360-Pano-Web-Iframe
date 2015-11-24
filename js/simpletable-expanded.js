/*
  Made from Tabletop.js, customized for much simpler use, and for use with custom URLs
  Sisi Wei, August 23, 2012
  Most recent update: Sept. 12, 2013 - Added timestamp to callback
*/

/*
  SimpleTable.init( { key: '0AlFpxYOw1xOidEg4anlYSElOXzRYN2UyNWhmcnFMMmc', worksheet: true, id: '', cached: true, iterator: true, callback: callback_test, staticURL: "www.washingtonpost.com", staticCallback: "createme" } );

  Options:
    key: String
        google spreadsheets key
    worksheet: Boolean
        true - Pull all the sheets from the google doc
        false - Default. Just use the first sheet in a google doc
    id: String
        the spreadsheet id in the url. defaults to 'od6', this is mainly used for worksheet
    cached: Boolean
        true - Flows google spreadsheet through apps.washingtonpost.com for caching
        false - Uses google spreadsheet directly, advantageous for development environment
    iterator: Boolean (optional parameter)
        true - Default. If you're making multiple SimpleTable calls, iterator the simpletable callback
        false - ADVANCED USE ONLY, turning off the iterator may cause simpletable not to return anything
    update_time: Boolean (optional)
        true - If you want a way to incorporate update time, you'll receive an object with a "updated" and "data" property.
        false - Default
    callback: function
        name of your call back function -- it must already exist in your js, this can be a jQuery callback
    staticURL: String
        the full url for your static jsonp file
    staticCallback: String
        what the callback attached to your staticURL is called
        ** Currently not supported when worksheet == true **
*/

(function(global) {

  var objectStore,
      stCacheDelay = 60 * 1000, // seconds * milliseconds
      worksheetCallback,
      worksheetObjectStore = {},
      worksheetLength = 0,
      sheetcount = 0,
      counter = 0;

  var SimpleTable = global.SimpleTable = function(options) {
    this.key = options.key;
    this.id = options.id ? (options.id) : "od6";
    this.cached = options.cached;
    this.worksheet = options.worksheet;
    this.update_time = options.update_time;
    this.callback = options.callback;
    this.googleURL = "https://spreadsheets.google.com/feeds/list/" + this.key + "/" + this.id + "/public/values?alt=json-in-script";
    this.appsURL = "https://www.washingtonpost.com/apps/national/proxy/google/spreadsheet/" + this.key + "/" + this.id + "/?alt=json-in-script";
    this.googleWorksheetURL = "https://spreadsheets.google.com/feeds/worksheets/" + this.key + "/public/basic?alt=json-in-script";
    this.appsWorksheetURL = "https://www.washingtonpost.com/apps/national/proxy/google/worksheet/" + this.key + "/?alt=json-in-script";
    this.iterator = (options.iterator == undefined) ? true : options.iterator;
    this.staticURL = (options.staticURL == undefined) ? "" : options.staticURL;
    this.jsoncache = true;
    this.token = Math.round(new Date().getTime()/stCacheDelay); // put a new token on the request every stCacheDelay milliseconds

    if (this.cached === true) {
        this.baseURL = this.worksheet === true ? this.appsWorksheetURL : this.appsURL ;
    } else {
        this.baseURL = this.worksheet === true ? this.googleWorksheetURL : this.googleURL ;
    }

    this.baseURL = (this.staticURL == "") ? this.baseURL : this.staticURL ;
    this.staticCallback = (options.staticCallback == undefined) ? "" : options.staticCallback ;

    this.fetch();
  };

  SimpleTable.init = function(options) {
    counter++;
    return new SimpleTable(options);
  }

  SimpleTable.prototype = {
    fetch: function(){
      var table = this;
      var c = (this.iterator) ? counter : '';
      var callback = ( this.staticCallback != "" ) ? this.staticCallback : "createSimpleTable" + c + this.token;

      jQuery.ajax({
        url: this.baseURL,
        cache: this.jsoncache,
        dataType: 'jsonp',
        jsonpCallback: callback,
        success: function(data){
          // this parses the worksheet layout and pulls in the data from each tab
          if ( table.worksheet === true ) {
            if (table.update_time) {
              worksheetObjectStore['updated'] = data.feed.updated["$t"];
            }
            var sheets = data.feed.entry;
            worksheetLength = sheets.length;
            sheetcount = 0;
            worksheetCallback = table.callback;
            jQuery.each(sheets, function(i,sheet) {
              var replace_str = 'https://spreadsheets.google.com/feeds/list/'+table.key+'/';
              var sheet_id = sheet.link[0].href.replace(replace_str,'').replace('/public/basic','');
              SimpleTable.init( { key: table.key, id: sheet_id, cached: table.cached, callback: table.parseSheet } );
            });
          } else {
            table.parseData(data);
          }
        }
      });
    },

    parseData: function(d){
      var dataStore = [];

      ss = d.feed.entry;
      this.title = d.feed.title["$t"];

      if (ss) {
        jQuery.each(ss, function(k,v){
          var rowObject = new Object();
          var colNames = [];
          jQuery.each(v, function(key, value){
            if (key.indexOf("gsx$") != -1){
              var cat = key.replace("gsx$", "");
              rowObject[cat] = value.$t;
            }
          });
          dataStore.push(rowObject);
        });
      }

      if (this.update_time){
        objectStore = {
          updated : d.feed.updated["$t"],
          data : dataStore
        }
      } else {
        objectStore = dataStore;
      }

      this.callback(objectStore);
    },

    parseSheet: function(d){
      worksheetObjectStore[this.title] = d;
      sheetcount++;
      if ( sheetcount === worksheetLength ) {
        worksheetCallback(worksheetObjectStore);
      }
    }
  };

})(this);
