var sqlDb = require('mssql');
var settings = require('../settings.js');

 exports.executeSQL = function (sql, callback) {
     
     var conn = new sqlDb.Connection(settings.dbConfig);
     conn.connect()
     .then(function(){
         var req = new sqlDb.Request(conn);
         req.query(sql)
         .then(function(recordset) {
             callback(recordset);
         })
         .catch(function(err) {
             console.log(err);
             callback(null, err);             
         });
     })
     .catch(function(err){
         console.log(err);
         callback(null, err);
     });
 };