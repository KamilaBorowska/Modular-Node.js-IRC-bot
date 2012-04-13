//Tell -- the only useful function of the old NinaBot
fs = require("fs");

exports.module = function() {
	this.onModuleStart = function() {
		this.noticesFor = [];
		self = this;
		fs.readdir("./modules/tell", function(error, listing) {
			if (error) fs.mkdir("./modules/tell");
			for (i in listing) {
				file = listing[i];
				file = file.substring(0, file.length - 4);
				self.noticesFor.push(file);
			}
		});
	}

	this.onCommand_tell = function(args) {
		args2 = args.text.split(" ");

		args2[0] = args2[0].replace("/", "");
		args2[0] = args2[0].replace("_", "");
		args2[0] = args2[0].replace(".", "");
		args2[0] = args2[0].replace("\\", "");
		args2[0] = args2[0].toLowerCase();
		if (args2[0] == args.user.toLowerCase()) {
			this.channel.say("You can't leave notices for yourself.");
			return;
		}

		tellMessage = "";
		for (i = 1; i < args2.length; i++) {
			tellMessage += args2[i] + " ";
		}
		tellMessage = tellMessage.trim();

		if (args.user.trim().length < 1 || tellMessage.trim().length < 1) {
			this.channel.say("You're doing it wrong.");
			return;
		}
		
		wStream = fs.createWriteStream("./modules/tell/" + args2[0] + ".txt", {flags: 'a'});
		wStream.write("<" + args.user + "> Tell " + args.text.split(" ")[0] + " " + tellMessage + "\n");
		wStream.end();
		this.noticesFor.push(args2[0]);
		this.channel.say("Notice left for " + args.text.split(" ")[0] + ".");
	}

	this.onMessage = function(args) {
		args.user = args.user.replace("/", "");
		args.user = args.user.replace("_", "");
		args.user = args.user.replace(".", "");
		args.user = args.user.replace("\\", "");
		args.user = args.user.toLowerCase();
		
		self = this;
		if (this.noticesFor.indexOf(args.user) != -1) {
			try {
				fs.readFile("./modules/tell/" + args.user + ".txt", 'utf8', function(error, content) {
					if (error) return;
					self.channel.say(content);
					fs.unlink("./modules/tell/" + args.user + ".txt");
				});
			} catch (Error) {
				this.channel.say("That's a nice name you got there.");
			}
		}
	}
}
