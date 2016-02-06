//
var emp = require('../controllers/employee');
var token = require('../token');
var Botkit = require('Botkit');
var slack = require('./slackrequest');

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
        slack.slackGet(empno);
       console.log("response is "+ response);
         
    bot.startConversation(message, function (err, convo) {
        convo.say('Whats your update for matter ' + message.text);
    });

    bot.startPrivateConversation(message, function (err, dm) {
       // dm.say('Private reply!');
    })

});














//cnversation



controller.hears(['GoGoUpdate'],['ambient'],function(bot,message) {
  bot.startConversation(message, askFlavor);
});

askFlavor = function(response, convo) {
  convo.ask("What Matter do you want to update?", function(response, convo) {
    convo.say("Awesome.");
    varMatter = response.text
    askSize(response, convo);
    convo.next();
  });
}
askSize = function(response, convo) {
  convo.ask("Whats the latest on matter " + varMatter + "?", function(response, convo) {
    //convo.say("Ok.")
    varStatus = response.text
    askWhereDeliver(response, convo);
    convo.next();
  });
}
askWhereDeliver = function(response, convo) { 
  convo.ask("Great. I'll record that matter " + varMatter + " is " + varStatus, function(response, convo) {
    //convo.say("Good bye.");
    convo.next();
  });
}


