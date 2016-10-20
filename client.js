var Message = require('./Model/message');
var net = require("net");
var prompt = require('prompt');
var client = new net.Socket();

client.connect(5000,function(){

    console.log(" Client conectat:");

});
client.on("error", function(err){
   console.log(err);
});
setTimeout(function() {
    showPrompt();
},500);

function showPrompt() {
    prompt.start();
    prompt.colors = true;
    prompt.get(['text'], function (err, result) {
        if (err) { return onErr(err);}

        if ( result.text != "") {
            // trimitere spre broker
            var mess = new Message("", "post", result.text, "");
            client.write(JSON.stringify(mess));
            console.log("Mesaj trimis!\n");
            showPrompt();
        } else {
            console.log("Scrie aici un mesaj...");
            showPrompt();
        }
    });
}