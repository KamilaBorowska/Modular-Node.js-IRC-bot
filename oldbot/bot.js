net = require('net');
os = require('os');
tty = require('tty');
fs = require("fs");

prepare = function() {
	settings = require('./settings.js');
	settings = settings.settings; //Is there a better way to do this?
	moduleSystem = require("./modules.js");
	func = require("./functions.js");
	//This used to be an object. Why?
	connections = [];

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
		moduleSystem.createModuleBucket("protocolIncoming" + this.id, "protocolIncoming/");
	}
		
    this.onLineRead = function(line) {
    	line = line.toString();
		func.outputMessage(">>> " + line);

		metaIndex = line.indexOf(" :");
		meta = line.substring(0, metaIndex);
		meta = meta.split(" ");
		data = line.substring(metaIndex+2);

		if (meta[0][0] != ":")
			command = meta[0];
		else
			command = meta[1];

		//Meta is what comes before :, data's what comes after.
		//This call invokes a module and loads it if it does not exist.
		
		caller = this;
		moduleSystem.runModule(
			"protocolIncoming" + this.id,
			command,
			{
				meta: meta,
				data: data,
				caller: caller,
			},
			true
		);
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
    	this.sendCommand("JOIN", this.serverSettings.channels.join(","));
		this.sendCommand("PRIVMSG", "#nsmbhacking :MODULE SYSTEM! :D");
	}
	
    this.sendCommand = function(command, args) {
		func.outputMessage("<<< " + command + " " + args);
    	this.socket.write(command+" "+args+"\r\n");
    }
}

prepare();
test = new ircServer(settings, settings.servers.localhost);
test.connect();

