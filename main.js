var Server = require("./Server.js").Server;
var Channel = require("./Channel.js").Channel;
var settings = require("./settings.js").settings;

if (settings.servers == undefined) {
	console.log("You haven't added any servers in the settings.");
	process.exit();
}

servers = [];
for (i in settings.servers) {
	var server = settings.servers[i];
	if (!server.address) throw new Error("You forgot the server address for a server.");
	if (!server.port)
		server.port = 6667;
	if (!server.nick)
		server.nick = settings.globalNick;
	if (!server.userName)
		server.userName = settings.globalUserName;
	if (!server.realName)
		server.realName = settings.globalRealName;
	
	servers[i] = new Server(server);
	if (typeof server.channels != 'undefined') {
		for (j in server.channels)
			servers[i].addChannel(new Channel(servers[i], server.channels[j]));
	}
	
	servers[i].connect();
}
