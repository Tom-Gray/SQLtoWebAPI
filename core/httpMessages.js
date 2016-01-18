var settings = require("../settings")

exports.show500 = function(req, res, err){
    if (settings.httpMsgFormat === "HTML") {
     res.writeHeader(500, "Internal Error", { "Content-type": "text/html"});
     res.write("<html><body>error:" + err + "</body></html>");
    }
    else {
      res.writeHeader(500, "Internal error", {"Content-type": "application/json"});
      res.write(JSON.stringify({data: "Error occured: " + err}));
    }
};

exports.show405 = function(req, res){
    if (settings.httpMsgFormat === "HTML") {
     res.writeHeader(405, "Internal Error", { "Content-type": "text/html"});
     res.write("<html><body>error:" + err + "</body></html>");
    }
    else {
      res.writeHeader(405, "Internal error", {"Content-type": "application/json"});
      res.write(JSON.stringify({data: "Error occured. 405: " + err}));
    }
};

exports.show404 = function(req, res){
    if (settings.httpMsgFormat === "HTML") {
     res.writeHeader(404, "resource not found", { "Content-type": "text/html"});
     res.write("<html><body>error:" + err + "</body></html>");
    }
    else {
      res.writeHeader(404, "resource not found error", {"Content-type": "application/json"});
      res.write(JSON.stringify({data: "Error occured: " + err}));
    }
};

exports.send200 = function(req, res){

      res.writeHeader(200, "OK", {"Content-type": "application/json"});
     res.end();
    
};

exports.showHome = function(req, res) {
        if (settings.httpMsgFormat === "HTML") {
     res.writeHeader(200, { "Content-type": "text/html"});
     res.write("<html><body>Valid endpoints: <br> /employees to GET all employees  </body></html>");
    }
    else {
      res.writeHeader(200,  {"Content-type": "application/json"});
      res.write(JSON.stringify([
          {url: "/employees", operation: "GET", description: "To List all employees"},
          {url: "/employees/<empNo>", operation: "GET", description: "Get individual"},
          {url: "/employees/<empNo>", operation: "PUT", description: "Update individual Employee"},
          {url: "/employees/<empNo>", operation: "DELETE", description: "Delete individual employee"}
          ]));
    }
    res.end();
};