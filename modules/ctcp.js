exports.module = function() {
	this.onMessage = function(user, message) {
		st = String.fromCharCode(1);
		os = require("os");
		console.log(message);
		if (message == st+"VERSION"+st)
			this.server.notice(user, " :NinaBot by Nina and Dirbaio. Running on Node.js " + process.versions.node + " (" + os.type() + " " + os.release() + " " + os.arch() + ")");
	}
}
