mc = require("./ModuleContainer.js");

exports.Channel = function(server, channelName)
{
	this.server = server;
	this.channelName = channelName;

	this.modules = new mc.ModuleContainer(this);
	

	this.onMessage = function(user, message)
	{
		modules.run('onMessage', user, message);
	}
	
	this.onCommand = function(user, command, args)
	{
		modules.run('onCommand_' + command, user, args);
	}
	
	this.onUserJoin = function(user)
	{
		modules.run('onUserJoin', user);
	}
	
	this.onUserLeave = function(user)
	{
		modules.run('onUserLeave', user);
	}
	
	this.say = function(text)
	{
		text = text.trim();
		text = text.split("\n");
		for (i in text)
			server.sendCommand("PRIVMSG", channelName+" :"+text[i]);
	}
	
	//TODO: Maybe more functions.
	//But we should only add what we need. No bloat :)
}
