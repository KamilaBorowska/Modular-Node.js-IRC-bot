exports.module = function() {
	this.onMessage = function(args) {
		if (args.message.toLowerCase().indexOf("y/n") != -1) {
			var rand = Math.ceil(Math.random()*2);
			if (rand == 1) {
				this.channel.say(args.user + ": Yes.");
			} else {
				this.channel.say(args.user + ": No.");
			}
		}
	}
}
