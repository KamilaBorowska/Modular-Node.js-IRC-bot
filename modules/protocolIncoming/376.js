exports.key = "376";

exports.func = function(args) {
	args.caller.onRegister();
	console.log("TEST");
}
