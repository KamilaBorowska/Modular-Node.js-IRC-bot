var killRequireCache = function() {
	for (i in require.cache)
		delete require.cache[i];
}


exports.module = function() {
	this.onCommand_modreload = function(args) {
		exports.killRequireCache();
		nick = args['nick'];
		args = args['text'];
		for (i in servers) {
			server = servers[i];
			for (j in server.channels) {
				channel = server.channels[j];
				if (channel.modules[args]) {
					this.channel.say("Reloading module: " + args);
					module.parent.exports.moduleSystem.reloadModule(channel, args);
				} else this.channel.say("Module not found: " + args);
			}
		}
	}
	this.onCommand_modload = function(args) {
		killRequireCache();
		this.channel.say("Loading module: " + args);
		module.parent.exports.moduleSystem.loadModule(this.channel, args.text);
	}
	this.onCommand_modunload = function(args) {
		killRequireCache();
		this.channel.say("Unloading module: " + args);
		module.parent.exports.moduleSystem.unloadModule(this.channel, args.text);
	}
}
