var killRequireCache = function() {
	for (i in require.cache)
		delete require.cache[i];
}

exports.module = function() {
	this.onCommand_modreload = function(nick, args, message) {
		if (this.server.getUserAuthenticated(message) == false)
			return false;
		killRequireCache();
		nick = args['nick'];
		for (i in servers) {
			server = servers[i];
			for (j in server.channels) {
				channel = server.channels[j];
				if (channel.modules[args]) {
					this.channel.say("Reloading module: " + args);
					module.channel.modules.load(args);
				} else this.channel.say("Module not found: " + args);
			}
		}
	}
	this.onCommand_modload = function(nick, args, message) {
		if (this.server.getUserAuthenticated(message) == false) return false;
		killRequireCache();
		this.channel.say("Loading module: " + args);
		module.parent.exports.moduleSystem.loadModule(this.channel, args);
	}
	this.onCommand_modunload = function(nick, message, args) {
		if (this.server.getUserAuthenticated(message) == false) return false;
		killRequireCache();
		this.channel.say("Unloading module: " + args);
		module.parent.exports.moduleSystem.unloadModule(this.channel, args);
	}
}
