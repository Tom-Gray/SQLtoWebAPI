//
var emp = require('../controllers/employee');
var token = require('../token');
var Botkit = require('Botkit');
var slack = require('./slackrequest');
var request = require("request");

var controller = Botkit.slackbot({
    debug: false,
});

var pattern = "[\\d{8}]"; //regex to validate matter record
                

var bot = controller.spawn(token.tokenstring).startRTM();

controller.hears(pattern, 'direct_message,direct_mention,mention', function (bot, message) {
    //send request with matter number to SQL GET command
    //initiate http request from here?
       
    var empno = "";
    empno = message.text //validate this first
       
    //same thing but using request:



    var url = "http://localhost:9000/employees/" + empno

    request.get(url, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        else {

            var parsed = JSON.parse(body);

            console.log(parsed);
            var recordLawyer = parsed[0].Lawyer;
            var recordClient = parsed[0].Client;
            var recordMatter = parsed[0].Matter;
            var recordDescription = (parsed[0].description);
            var recordStatus = (parsed[0].Status);

        }


        bot.startConversation(message, function (err, convo) {
            convo.say('```Client: ' + recordClient + "\nMatter: " + recordDescription + "\nCurrent Status: " + recordStatus + "```");
            convo.ask('Whats the latest status for this matter?', function (response, convo) {
                varStatus = response.text;






                request({
                    url: 'http://localhost:9000/employees/', //URL to hit
    
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: {
                        Matter:   recordMatter,
                        Status:  varStatus
                    }

                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(response.statusCode, body);
                        convo.say("No worries. The status of *" + recordMatter + "* is now " + varStatus);
                        convo.next();
                    }
                });


               // convo.say("No worries. The status of *" + recordMatter + "* is now " + varStatus);
               // convo.next();
            })
        });


    })


});

