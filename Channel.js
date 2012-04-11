testModule = function()
{
	this.a = "meep";
	this.onMessage = function(user, message)
	{
		this.channel.say(user+" said: "+message);
	}
}

testModule = function()	{
	this.a = "meep";
	this.onMessage = function(user, message)
	{
		this.channel.say(user+" said: "+message);
	}
}		

exports.Channel = function(server, channelName)
{
	this.server = server;
	this.channelName = channelName;

	this.modules = [];
	
	this.startModules = function()
	{
		var self = this;

		this.modules.forEach(function(module){
			module.channel = self;
			if(module.onModuleStart)
				module.onModuleStart();
		});		
	}

	this.onMessage = function(user, message)
	{
		this.modules.forEach(function(module){
			if (module.onMessage) {
				module.onMessage(user, message);
			}
		});
	}
	
	//Commands are something like :nb command arg1 arg2 arg3
	//It's a good idea to handle them separately from messages.
	this.onCommand = function(user, command, args)
	{
		//We can make commands be their own functions in the nodes!
		//Note: I haven't tested what's below but it should work
		//Maybe we want to change the way they're named: command_help is UGLY.
		
		this.modules.forEach(function(module){
			if(module['onCommand_'+command])
				module['onCommand_'+command](user, args);
		});
		
	}
	
	this.onUserJoin = function(user)
	{
		this.modules.forEach(function(module){
			if(module.onUserJoin)
				module.onUserJoin(user, message);
		});
	}
	
	this.onUserLeave = function(user)
	{
		this.modules.forEach(function(module){
			if(module.onUserLeave)
				module.onUserLeave(user, message);
		});
	}
	
	this.say = function(text)
	{
		server.sendCommand("PRIVMSG", channelName+" :"+text);
	}
	
	//TODO: Maybe more functions.
	//But we should only add what we need. No bloat :)
}
