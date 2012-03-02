var net = require('net');
var os = require('os');

connections = [];

//TODO: Put somewhere else
settings = {
	defaultNick: "NinaBot",
	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			moduleOptions: {
				channels: ["#abxd", "#nsmbhacking"]
			}
		}
	},
	username: "nina",
	realname: "Bot",
	modDefault: []
};

ircServer = function(args) {
	this.settings = args;
	this.connect = function() {
		if (this.settings.port == undefined)
			this.settings.port = 6667;
		this.socket = net.connect(this.settings.port, this.settings.address);
		this.socket.parent = this;
		this.socket.on("connect", function() {
			connected = true;
		});
		console.log(this.connected);
	}
}

test = new ircServer(settings.servers.digibase);
test.connect();
