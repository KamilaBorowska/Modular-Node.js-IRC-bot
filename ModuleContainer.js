exports.ModuleContainer = function(server, channel)
{
	this.modules = [];
	
	this.channel = channel;
	this.server = server;
	
	this.load = function(moduleSettings)
	{
		for(l in moduleSettings)
		{
			var moduleName = moduleSettings[l];
			this.loadModule(moduleName);
		}
	}

	this.loadSettings = function(settings) {
		for (i in this.modules) {
			this.modules[i].settings = settings;
		}
	}
	
	this.loadModule = function(moduleName)
	{
		var module = require("./modules/"+moduleName+".js").module;
		var moduleInstance = new module();
		moduleInstance.server = this.server;
		moduleInstance.channel = this.channel;
		moduleInstance.container = this;
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
