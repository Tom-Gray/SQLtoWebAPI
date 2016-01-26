//
var emp = require('../controllers/employee');
var token = require('../token');
var Botkit = require('Botkit');


var controller = Botkit.slackbot({
    debug: false,
});

var pattern = "[M\\d{8}]"; //regex to validate matter record
                

var bot = controller.spawn(token.tokenstring).startRTM();
    
    controller.hears(pattern, 'direct_message,direct_mention,mention', function (bot, message) {
        //send request with matter number to SQL GET command
        var empno = "";
        empno = message.text //validate this first
         emp.get(empno);
         
         
    bot.startConversation(message, function (err, convo) {
        convo.say('you requested Matter: ' + message.text);
    });

    bot.startPrivateConversation(message, function (err, dm) {
        dm.say('Private reply!');
    })

});