var http = require('http');
var emp = require('../controllers/employee');
var httpMsgs = require("./httpmessages");

var settings = require('../settings');
http.createServer(function(req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, res);
                res.end(); //send index file or something.
            }
            else if (req.url === "/employees") {
                emp.getList(req, res);
            }
            else {
                var empPattern = "[0-9]+"; //regex to validate shit
                var patt = new RegExp("/employees/" + empPattern);
                if (patt.test(req.url)) {
                    
                }
            }
        break;
        case "POST":
            if (req.url === "/employees/"){
                var reqBody = "";
                req.on("data", function(data){
                    reqBody += data;
                   // if (req.body.length > 1e7) //if receive more than 10mb, send error
                    //{
                      //  httpMsgs.show500
                    //}
                });
                req.on("end", function(){
                    emp.add(req, res, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, res);
            }
        break;
        case "PUT":
        if (req.url === "/employees"){
                
            }
            else {
                httpMsgs.show404(req, res);
            }
        break;
        case "DELETE":
        if (req.url === "/employees"){
                
            }
            else {
                httpMsgs.show404(req, res);
            }
        break;
        default:
        httpMsgs.show405(req, res);
        break; //do error handling
        
    }
    
    
}).listen(settings.webPort, function(){
    console.log("server listening on " + settings.webPort);
});