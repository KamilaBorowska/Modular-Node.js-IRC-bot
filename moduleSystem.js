fs = require("fs");

exports.reloadModule = function(target, modName) {
	if (target.modules[modName]) {
		if (target.modules[modName].onModuleDestroy)
			target.modules[modName].onModuleDestroy();
		delete target.modules[modName];
		target.modules[modName] = require("./modules/" + modName + ".js");
		target.startModules(modName);
		return true;
	} else return false;
}

exports.loadModule = function(target, modName) {
	if (fs.stat("./modules/" + modName + ".js", function(error) {if (error) return error; else return false;}) == false) return;
	target.modules[modName] = require("./modules/" + modName + ".js");
	target.startModules(modName);
}

exports.unloadModule = function(target, modName) {
	if (target.modules[modName].onModuleDestroy)
		target.modules[modName].onModuleDestroy();
	delete target.modules[modName];
}
