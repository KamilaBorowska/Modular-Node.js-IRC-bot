exports.key = "PING";

exports.func = function(args) {
	console.log("TEST");
	args.caller.sendCommand("PONG", args.caller.args);
}
