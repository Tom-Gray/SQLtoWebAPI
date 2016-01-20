var db = require("../core/db");
var httpMsgs = require("../core/httpMessages");
var util = require("util");

exports.getList = function (req, res) {
    db.executeSQL("SELECT * FROM status", function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            res.writeHeader(200, { "Content-type": "application/json" });
            res.write(JSON.stringify(data)); //use modular version
           
        }
        res.end(); // res.end goes here now
    });
};

exports.get = function (req, res, empno) {
    db.executeSQL("SELECT * FROM status WHERE lawyer=" + empno, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            res.writeHeader(200, { "Content-type": "application/json" });
            res.write(JSON.stringify(data)); //use modular version
           
        }
        res.end(); // res.end goes here now
    });
};

exports.add = function (req, res, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO status (Lawyer, Matter, Client, Description, Status) VALUES";
            sql += util.format("(%s, %s, %s, %s, %s)", data.Lawyer, data.Matter, data.client, data.description, data.status);
            db.executeSQL(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    httpMsgs.send200(req, res);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};

exports.update = function (req, res, reqBody) {

};

exports.delete = function (req, res, reqBody) {

};