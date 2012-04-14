mc = require("./ModuleContainer.js");

exports.Channel = function(server, channelName)
{
	this.server = server;
	this.channelName = channelName;

	this.modules = new mc.ModuleContainer(server, this, this.moduleSettings);
	

	this.onMessage = function(user, message)
	{
		this.modules.run('onMessage', user, message);
	}
	
	this.onCommand = function(user, command, args)
	{
		console.log(arguments);
		this.modules.run('onCommand_' + command, user, args);
	}
	
	this.onUserJoin = function(user)
	{
		this.modules.run('onUserJoin', user);
	}
	
	this.onUserLeave = function(user)
	{
		this.modules.run('onUserLeave', user);
	}
	
	this.say = function(text)
	{
		if (typeof text != 'string')
			text = text.toString();
		text = text.trim();
		text = text.split("\n");
		for (i in text)
			server.sendCommand("PRIVMSG", channelName+" :"+text[i]);
	}
	
	//TODO: Maybe more functions.
	//But we should only add what we need. No bloat :)
}
