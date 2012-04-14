//Tell -- the only useful function of the old NinaBot
fs = require("fs");

exports.module = function() {
	this.normalize = function(ret) {
		while (ret.indexOf("/") != -1 || ret.indexOf("_") != -1 || ret.indexOf(".") != -1 || ret.indexOf("\\") != -1) {
			ret = ret.replace("/", "");
			ret = ret.replace("_", "");
			ret = ret.replace(".", "");
			ret = ret.replace("\\", "");
		}
		return ret;
	}
	
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

	this.onCommand_tell = function(user, args) {
		console.log(arguments);
		args2 = args.split(" ");
		args2[0] = this.normalize(args2[0]);

		if (args2[0] == user.toLowerCase()) {
			this.channel.say("You can't leave notices for yourself.");
			return;
		}

		tellMessage = "";
		for (i = 1; i < args2.length; i++) {
			tellMessage += args2[i] + " ";
		}
		tellMessage = tellMessage.trim();

		if (user.trim().length < 1 || tellMessage.trim().length < 1) {
			this.channel.say("You're doing it wrong.");
			return;
		}

		self = this;

		if (args2[0] + ".txt".trim() == ".txt") {
			this.channel.say("No, I don't think so.");
			return;
		}
		
		try {
			wStream = fs.createWriteStream("./modules/tell/" + args2[0] + ".txt", {flags: 'a'});
		} catch (error) {
			self.channel.say("That'd go wrong...");
			return;
		}
		wStream.write("<" + user + "> Tell " + args.split(" ")[0] + " " + tellMessage + "\n");
		wStream.end();
		this.noticesFor.push(args2[0]);
		this.channel.say("Notice left for " + args.split(" ")[0] + ".");
	}

	this.onMessage = function(user, message) {
		self = this;
		user = self.normalize(user);
		if (this.noticesFor.indexOf(user) != -1) {
			fs.readFile("./modules/tell/" + user + ".txt", 'utf8', function(error, content) {
				if (error) return;
				self.channel.say(content);
				fs.unlink("./modules/tell/" + user + ".txt");
			});
		}
	}
}
