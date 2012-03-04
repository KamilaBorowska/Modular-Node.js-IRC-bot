var net = require('net');
var os = require('os');
var tty = require('tty');

settings = require('./settings.js');
settings = settings.settings; //Is there a better way to do this?

var moduleSystem = require("./modules.js");

moduleSystem.createModuleBucket("test");

connections = {};

ircServer = function(args) {
	this.settings = args;
	this.connected = false;
	this.connect = function() {
		if (this.settings.port == undefined)
			this.settings.port = 6667;
		this.socket = net.connect(this.settings.port, this.settings.address);
		this.socket.parent = this;
		this.socket.on("connect", function() {
			this.parent.connected = true;
		});
	}
}

test = new ircServer(settings.servers.digibase);
test.connect();
