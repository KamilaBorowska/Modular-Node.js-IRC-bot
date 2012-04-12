exports.module = function() {
	this.onCommand_chance = function(nick, command, args) {
		rand = Math.ceil(Math.random()*100);
		this.channel.say(nick + ": " + rand);
	}
}
