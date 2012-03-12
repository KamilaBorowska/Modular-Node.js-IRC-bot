net = require('net');
os = require('os');
tty = require('tty');
fs = require("fs");

prepare = function() {
	settings = require('./settings.js');
	settings = settings.settings; //Is there a better way to do this?

	moduleSystem = require("./modules.js");
	moduleSystem.createModuleBucket("internal");
	moduleSystem.loadModule("consoleLog");
	moduleSystem.createModuleBucket("ircProtocol");
	moduleSystem.createModuleBucket("ircProtocolOutgoing");

	notDone = true;
	while (notDone) {
		if (moduleSystem != undefined) {
			require("./functions.js");
			connections = {};
		}
	}
}

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
prepare();

test = new ircServer(settings.servers.digibase);
test.connect();
