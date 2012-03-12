net = require('net');
os = require('os');
tty = require('tty');
fs = require("fs");

prepare = function() {
	settings = require('./settings.js');
	settings = settings.settings; //Is there a better way to do this?
	moduleSystem = require("./modules.js");
	require("./functions.js");
	connections = {};

}

connectionId = 0;
ircServer = function(s1, s2) {
	this.serverSettings = s2;
	this.globalSettings = s1;
	this.connected = false;
	this.id = connectionId;
	connectionId++;
	
	this.connect = function() {
		if (this.serverSettings.port == undefined)
			this.serverSettings.port = 6667;

		console.log("Connecting...");
		this.socket = net.createConnection(this.serverSettings.port, this.serverSettings.address);
		this.socket.parent = this;
		this.socket.on("connect", function() { this.parent.onSocketConnect() } );
		moduleSystem.createModuleBucket("protocolIncoming" + this.id, true);
		moduleSystem.createModuleBucket("protocolOutgoing" + this.id, true);
	}
		
    this.onLineRead = function(line) {
    	line = line.toString();
    	var ind = line.indexOf(" ");
    	if(ind == -1) return;
    	var cmd = line.substring(0, ind);
    	var args = line.substring(ind+1);
		console.log(">>> "+line);
		
		if(cmd == "PING")
			this.sendCommand("PONG", args);
		else
		{
			ind = args.indexOf(" ");
			if(ind == -1) return;
			var cmd2 = args.substring(0, ind);
			args = args.substring(ind+1);
			if(cmd2 == "376")
				this.onRegister();
		}
    }

    this.onSocketConnect = function() {
		this.connected = true;
		console.log("Connected");

		var lazy = require("lazy");

		var l = new lazy(this.socket);
		var thisServer = this;
		
		l.lines.forEach(function(line) {thisServer.onLineRead(line)});
		
		var nick = this.globalSettings.defaultNick;
		this.sendCommand("NICK", nick);
		this.sendCommand("USER", nick+" "+nick+" "+this.serverSettings.address+" "+nick);
    }
    
    this.onRegister = function() {
    	//this.sendCommand("JOIN", this.serverSettings.channels.join(","));
		//Let's not do that just yet.
	}
	
    this.sendCommand = function(command, args) {
		if (
    	this.socket.write(command+" "+args+"\r\n");
    }
}

prepare();
test = new ircServer(settings, settings.servers.localhost);
test.connect();

