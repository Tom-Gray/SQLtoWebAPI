var http = require('http');
var emp = require('../controllers/employee');
var httpMsgs = require("./httpmessages");
var settings = require('../settings');

http.createServer(function(req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, res);
                res.end(); //send index.html file or something.
            }
            else if (req.url === "/employees" || req.url === "/employees/") {
                res.setHeader('Access-Control-Allow-Origin', '*');
                emp.getList(req, res);
            }
            else {
                var empPattern = "[\\d{8}]"; //regex to validate shit
                var patt = new RegExp("/employees/" + empPattern);
                if (patt.test(req.url)) {
                     res.setHeader('Access-Control-Allow-Origin', '*'); 
                     empno = (req.url).substring(11)
                     console.log(empno)
                    emp.get(req, res, empno);  
                                      
                }
            }
        break;
        case "POST":
            if (req.url === "/employees/"){
                var reqBody = "";
                req.on("data", function(data){
                    reqBody += data;

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
        if (req.url === "/employees/"){
                var reqBody = "";
                req.on("data", function(data){
                    reqBody += data;

                });
                req.on("end", function(){
                    emp.update(req, res, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, res);
            }
        break;
        case "DELETE":
        if (req.url === "/employees/"){
                var reqBody = "";
                req.on("data", function(data){
                    reqBody += data;

                });
                req.on("end", function(){
                    emp.delete(req, res, reqBody);
                });
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