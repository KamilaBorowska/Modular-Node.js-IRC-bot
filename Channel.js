exports.Channel = function(server, channelName)
{
	this.server = server;
	this.channelName = channelName;

	this.modules = {};
	
	//If you supply a module name here, only that will be started.
	this.startModules = function(mod)
	{
		var self = this;

		if (typeof mod != "undefined") {
			this.modules[mod] = new this.modules[mod].module;
			this.modules[mod].channel = self;
			if (this.modules[mod].onModuleStart)
				this.modules[mod].onModuleStart();
			return;
		}

		for (i in this.modules) {
			module = this.modules[i];
			module.channel = self;
			if (module.onModuleStart)
				module.onModuleStart();
		}
	}

	this.runModules = function(func, args) {
		for (i in this.modules) {
			module = this.modules[i];
			if (module[func]) {
				module[func](args);
			}
		}
	}


	this.onMessage = function(user, message)
	{
		this.runModules('onMessage', {user: user, message: message});
	}
	
	//Commands are something like :nb command arg1 arg2 arg3
	//It's a good idea to handle them separately from messages.
	this.onCommand = function(user, command, args)
	{
		//We can make commands be their own functions in the nodes!
		//Note: I haven't tested what's below but it should work
		//Maybe we want to change the way they're named: command_help is UGLY.
		
		this.runModules('onCommand_' + command, {user: user, text: args});
		
	}
	
	this.onUserJoin = function(user)
	{
		this.runModules('onUserJoin', {user: user});
	}
	
	this.onUserLeave = function(user)
	{
		this.runModules('onUserLeave', {user: user});
	}
	
	this.say = function(text)
	{
		text = text.split("\n").trim();
		for (i in text)
			server.sendCommand("PRIVMSG", channelName+" :"+text[i]);
	}
	
	//TODO: Maybe more functions.
	//But we should only add what we need. No bloat :)
}
