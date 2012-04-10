/*
   ====================
   Modules system
   ====================
*/

exports.modules = {};

//autoLoading defines if the bot should try to autoload a module if it's missing.
exports.createModuleBucket = function(name, baseDir) {
	exports.modules[name] = {
		baseDir: baseDir,
		modules: {}
	};
}

exports.loadModule = function(bucket, modName) {
	baseDir = exports.modules[bucket].baseDir;
	console.log(exports.modules[bucket]);
	console.log("Bucket: " + bucket);
	fs.readFile(settings.moduleSystem.path + baseDir + modName + ".js", function(err, data) {
		if (err) {
			return false;
		}
		else {
			module = require(settings.moduleSystem.path + baseDir + modName + ".js");
			if (module.key != undefined && module.func != undefined) {
				/* TODO: Handling of module dependencies */
				exports.modules[bucket].modules[module.key] = func.clone(module);
				return true;
			} else return false;
		}
	});
}

exports.unloadModule = function(bucket, module) {
	if (exports.modules[bucket].modules[module] != undefined)
		delete exports.modules[bucket].modules[module];

}

exports.runModule = function(bucket, key, arguments, autoLoad) {
	if (exports.modules[bucket].modules[key] != undefined) {
		return exports.modules[bucket][key].func(arguments);
	} else if (autoLoad) {
		if (exports.loadModule(exports.bucket, key)) {
			return exports.modules[bucket].modules[key].func(arguments);
			func.outputMessage("Loading module " + key + " for " + bucket + " because it did not exist.");
		}
	} else {
		console.log("Module execution failed.");
		return false;
	}
}
