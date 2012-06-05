net = require('net');

exports.module = function() {
	this.onModuleStart = function(settings) {
		var self = this;
		this.server = net.createServer(function(co) {
			re = "";
			co.on("data", function(data) {
				re += data;
			});

			co.on('end', function() {
				self.channel.say(re);
				delete re;
			});
		});

		this.server.listen(this.settings.port, "127.0.0.1");
	}

	this.onModuleDestroy = function() {
		this.server.close();
	}
}
