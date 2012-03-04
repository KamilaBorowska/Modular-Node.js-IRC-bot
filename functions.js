exports.outputMessage = function(message) {
	moduleSystem.runModule("internal", "outputMessage", {message: message});
}
