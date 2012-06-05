exports.module = function() {
	this.onCommand_authtest = function(nick, command, args) {
		if (this.server.getUserAuthenticated(args))
			this.channel.say(nick + " is authenticated.");
		else
			this.channel.say(nick + " isn't authenticated.");
	}
}
