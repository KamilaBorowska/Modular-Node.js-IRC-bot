/* ====================
   Modules system
   ====================
   This system works by using module "buckets" to store the modules and using "key" to invoke the functionality of the module.
   For example, we could have a bucket called ircProtocol that defines what to do with different things in the IRC protocol, in which we could have a key called "PRIVMSG" registered by the PRIVMSG module.
   When some data is received and what has to be done with it is determined, it would run a function from the module assocated with said function.
*/

exports.modules = {};
exports.loadedModules = [];

exports.createModuleBucket = function(name) {
	exports.modules[name] = {};
}

exports.loadModule = function(modName) {
	fs.readFile(settings.moduleSystem.path + modName + ".js", function(err, data) {
		if (err) {
			func.outputMessage("The module at " + settings.moduleSystem.path + modName + ".js could not be loaded.");
		}
		else {
			module = require("./modules/" + modName + ".js");
			if (module.key != undefined && module.func != undefined && module.bucket != undefined) {
				/* TODO: Handling of module dependencies */
				exports.modules[module.bucket][module.key] = func.clone(module);
				return true;
			} else return false;
		}
	});
}

exports.unloadModule = function(bucket, module) {
	if (exports.modules[bucket][module] != undefined)
		delete exports.modules[bucket][module];

}

exports.runModule = function(bucket, key, arguments) {
	if (exports.modules[bucket][key] != undefined) {
		exports.modules[bucket][key].func(argumentss);
		return true;
	} else {
		console.log("Module execution failed.");
	}
}
