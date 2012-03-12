//Functions hub

//Output a message to the console using the loaded outputMessage module, fall back to console.log() if there's none.
exports.outputMessage = function(message) {
	if (moduleSystem.modules.internal.outputMessage != undefined)
		moduleSystem.runModule("internal", "outputMessage", {message: message});
	else console.log(message);
}

//Grabbed this from somewhere.
exports.clone = function(srcInstance) {
	if(typeof(srcInstance) != Object || srcInstance == null)
		return srcInstance;
	var newInstance = srcInstance.constructor();
	for(var i in srcInstance)
		newInstance[i] = clone(srcInstance[i]);
	return newInstance;
}
