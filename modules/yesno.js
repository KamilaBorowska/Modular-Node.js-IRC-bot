exports.module = function() {
	this.onMessage = function(user, message) {
		if (message.toLowerCase().indexOf("y/n") != -1) {
			var rand = Math.ceil(Math.random()*2);
			if (rand == 1) {
				this.channel.say(user + ": Yes.");
			} else {
				this.channel.say(user + ": No.");
			}
		}
	}
}
