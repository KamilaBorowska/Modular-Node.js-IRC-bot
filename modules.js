/* ====================
   Modules system
   ====================
   This system works by using module "buckets" to store the modules and using "cases" to invoke the functionality of the module.
   For example, we could have a bucket called ircProtocol that defines what to do with different things in the IRC protocol, in which we could have a case called "PRIVMSG" registered by the PRIVMSG module.
   When some data is received and what has to be done with it is determined, it would run a function from the module assocated with said function.
*/

exports.modules = {};
exports.loadedModules = [];

exports.createModuleBucket = function(name) {
	exports.modules[name] = {};
	console.log(exports.modules);
}

exports.loadModule = function(modName) {
	module = require("./modules/" + modName + ".js");
	if (modules.case != undefined && modules.function != undefined && module.dependencies != undefined) {
		
		modules[module.case][modName] = module;
		return true;
	} else return false;
}
