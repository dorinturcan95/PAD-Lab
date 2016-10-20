var sm = require('./StorageManager/storage-manager');
var Message = require('./Model/message');
var server = require("net");
var fs;
fs = require("fs");

var messages = [];

server.createServer( function(socket){
	socket.name = socket.remoteAddress + ":" + socket.remotePort;
	console.log("Conexiune noua... > " + socket.name);

	socket.on('data', function(data){
        var msg;
        msg = JSON.parse(data);

        if (msg.type == "get") {
            socket.write(JSON.stringify(messages.pop()))
        }

        if (msg.type == "post" ){
            messages.push(msg.text)
        }

        console.log(messages);
	});
	socket.on('close', function () {
        console.log("Deconectat > " + socket.name);
        var index = sockets.indexOf(socket);
        if (index > -1) {
           sockets.splice(index, 1);
        }
        console.log("Noduri conectate: " + sockets.length);
	});
	socket.on('error', function () {
	});
	socket.on('end', function(){
	});
}).listen(5000);

console.log("**************************");
console.log("***** Server ON! *********");
console.log("**************************");



