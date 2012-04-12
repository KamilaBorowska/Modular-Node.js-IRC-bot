var Server = require("./Server.js").Server;
var Channel = require("./Channel.js").Channel;
var settings = require("./settings.js").settings;

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

	servers[i] = new Server(serverSettings);

	for(l in serverSettings.modules)
	{
		var moduleName = serverSettings.modules[l];
		var module = require("./modules/"+moduleName+".js").module;
		servers[i].modules.push(new module());
	}

	servers[i].startModules();

	if (typeof serverSettings.channels != 'undefined') {
		for (channelName in serverSettings.channels)
		{
			var channel = new Channel(servers[i], channelName);
			if (settings.globalModules)
				serverSettings.channels[channelName] = serverSettings.channels[channelName].concat(settings.globalModules);
			for(k in serverSettings.channels[channelName])
			{
				var modulename = serverSettings.channels[channelName][k];
				var module = require("./modules/"+modulename+".js").module;
				channel.modules.push(new module());
			}
			servers[i].addChannel(channel);
		}
	}
	
	servers[i].connect();
}

testServ = net.createServer(function(c) {
	c.on("data", function(data) {
		for (i in servers) {
			server = servers[i];
			server.channels["#nsmbhacking"].say(data);
		}
	});
});

testServ.listen(8124);
