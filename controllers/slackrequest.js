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



