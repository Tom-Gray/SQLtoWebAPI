var http = require("http");

exports.slackGet = function (empno) {
    return http.get({
        host: 'localhost',
        path: '/employees/' + empno,
        port: 9000
    }, function (response) {
        var body = "";
        response.on('data', function (d) {
            body += d;
            console.log('Got response: ${response.statusCode}');
        });
        response.on('end', function () {
            var parsed = JSON.parse(body);
            console.log(parsed);

        });

    });
};




//same thing but using request:

var request = require("request");

var url = "http://localhost:9000" + empno

    request.get(url, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(response);
        }

    });