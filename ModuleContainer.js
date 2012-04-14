exports.ModuleContainer = function(server, channel)
{
	this.modules = [];
	
	this.channel = channel;
	this.server = server;
	
	this.load = function(moduleSettings)
	{
		for(moduleName in moduleSettings)
		{
			console.log(moduleName);
			this.loadModule(moduleName, moduleSettings[moduleName]);
		}
	}

	this.loadModule = function(moduleName, settings)
	{
		var module = require("./modules/"+moduleName+".js").module;
		var moduleInstance = new module();
		moduleInstance.server = this.server;
		moduleInstance.channel = this.channel;
		moduleInstance.container = this;
		moduleInstance.settings = settings;
		this.modules.push(moduleInstance);
	}
	
	this.start = function()
	{
		this.run("onModuleStart");
	}
	
	this.run = function(func)
	{
		//Create the arguments array to call the functions
		var args = [];
		for(i = 0; i < arguments.length-1; i++)
			args[i] = arguments[i+1];
		
		for (i in this.modules) {
			module = this.modules[i];
			if (module[func]) {
				module[func].apply(module, args);
			}
		}
	}
}
