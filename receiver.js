var Message = require('./Model/message');
var net = require("net");
var prompt = require('prompt');
var client = new net.Socket();

client.connect(5000,function(){
    console.log("Receiver conectat! ");

});
client.on('data',function(data){
    var msg = JSON.parse(data);
    console.log("\rMesaj nou din coada: " + msg);
});

client.on('error', function () {
    
})
setTimeout(function() {
    showPrompt();
},500);

function showPrompt() {
    prompt.start();
    prompt.colors = true;
    prompt.get(['type'], function (err, result) {
        if (err) { return onErr(err);}
        var msg = new Message();
        msg.queue = "";
        msg.type = result.type;
        msg.text = "";

        if (result.type != "" ) {
            client.write(JSON.stringify(msg));
            console.log(" Mesaj trimis!");
            console.log("\r");
            setTimeout(function() {
                showPrompt();
            },500);
        } else {
            console.log("Cimpuri goale!");
            setTimeout(function() {
                showPrompt();
            },500);
        }

    });
}



