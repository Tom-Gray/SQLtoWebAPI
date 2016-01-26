//

var token = require('../token');
var Botkit = require('Botkit');


var controller = Botkit.slackbot({
    debug: false,
});

var pattern = "[M\d\d\d\d\d\d\d\d]"; //regex to validate shit
                var patt = new RegExp(pattern);

var bot = controller.spawn(token.tokenstring).startRTM();
    
    controller.hears(patt, 'direct_message,direct_mention,mention', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Heard ya');
    });

    bot.startPrivateConversation(message, function (err, dm) {
        dm.say('Private reply!');
    })

});