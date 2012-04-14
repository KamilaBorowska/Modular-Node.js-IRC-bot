var Server = require("./Server.js").Server;
var Channel = require("./Channel.js").Channel;
var settings = require("./settings.js").settings;
exports.moduleSystem = require("./moduleSystem.js");

if (settings.servers == undefined) {
	console.log("You haven't added any servers in the settings.");
	process.exit();
}

servers = [];
for (i in settings.servers) {
	var serverSettings = settings.servers[i];
	if (!serverSettings.address) throw new Error("You forgot the server address for a server.");
	if (!serverSettings.port)
		serverSettings.port = 6667;
	if (!serverSettings.nick)
		serverSettings.nick = settings.globalNick;
	if (!serverSettings.userName)
		serverSettings.userName = settings.globalUserName;
	if (!serverSettings.realName)
		serverSettings.realName = settings.globalRealName;
	if (!serverSettings.commandPrefix)
		serverSettings.commandPrefix = settings.defaultCommandPrefix;

	if (settings.globalServModules)
		serverSettings.modules = serverSettings.modules.concat(settings.globalServModules);

	var server = new Server(serverSettings);
	server.modules.load(serverSettings.modules);

	if (typeof serverSettings.channels != 'undefined') {
		for (channelName in serverSettings.channels) {
			var channel = new Channel(server, channelName);
			channel.modules.load(settings.globalModules);
			channel.modules.load(serverSettings.channels[channelName].modules);
			channel.modules.loadSettings(serverSettings.channels[channelName].moduleSettings);
			server.addChannel(channel);
		}
	}
	
	server.connect();
	servers.push(server);
}
