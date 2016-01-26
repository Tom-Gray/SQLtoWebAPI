//

exports.slackBot = function(){
var token = require('../token');
var Botkit = require('Botkit');


var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn(token.tokenstring).startRTM();
    
    controller.hears(['dm me'], 'direct_message,direct_mention,mention', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.say('Heard ya');
    });

    bot.startPrivateConversation(message, function (err, dm) {
        dm.say('Private reply!');
    })

})
};