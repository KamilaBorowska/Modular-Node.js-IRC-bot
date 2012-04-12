exports.module = function() {
	this.onMessage = function(args) {
		args.text = args.args[1].trim();
		st = String.fromCharCode(1);
		os = require("os");
		
		if (args.text == st+"VERSION"+st)
			this.server.sendCommand("NOTICE", args.nick + " :NinaBot by Nina and Dirbaio. Running on Node.js " + process.versions.node + " (" + os.type() + " " + os.release() + " " + os.arch() + ")");
	}
}
