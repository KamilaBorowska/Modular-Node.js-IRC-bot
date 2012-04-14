net = require('net');

exports.module = function() {
	this.onModuleStart = function(settings) {
		self = this;
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

		this.server.listen(8755, "127.0.0.1");
	}

	this.onModuleDestroy = function() {
		this.server.close();
	}
}
