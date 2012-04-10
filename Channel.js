
exports.Channel = function(server, channelName)
{
	this.server = server;
	this.channelName = channelName;

	this.modules = []; //TODO Load modules

	this.gotMessage = function(user, message)
	{
		//We can run modules like this:
		modules.forEach(function(module){
			if(module.gotMessage)
				module.gotMessage(user, message);
		});
	}
	
	//Commands are something like :nb command arg1 arg2 arg3
	//It's a good idea to handle them separately from messages.
	this.gotCommand = function(user, command, args)
	{
		//We can make commands be their own functions in the nodes!
		//Note: I haven't tested what's below but it should work
		//Maybe we want to change the way they're named: command_help is UGLY.
		
		modules.forEach(function(module){
			if(module['command_'+command])
				module.['command_'+command](user, args);
		});
		
	}
	
	this.userJoined = function(user)
	{
		//TODO
	}
	
	this.userLeft = function(user)
	{
		//TODO
	}
	
	//TODO: Maybe more functions.
	//But we should only add what we need. No bloat :)
}
