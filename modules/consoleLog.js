// Module that uses console.log() for bot output.

exports.bucket = "internal";
exports.key = "outputMessage";

exports.func = function(arg) {
	console.log(arg.message);
}
