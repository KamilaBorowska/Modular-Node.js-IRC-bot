net = require('net');

exports.module = function() {
	this.onModuleStart = function(settings) {
		self = this;
		this.server = net.createServer(function(co) {
			co.on("data", function(data) {
				self.channel.say(data);
			});
		});

		this.server.listen(8755, "127.0.0.1");
	}

	this.onModuleDestroy = function() {
		this.server.close();
	}
}
