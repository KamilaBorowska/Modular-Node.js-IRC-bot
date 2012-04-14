exports.ModuleContainer = function(server, channel=undefined)
{
	this.modules = [];
	
	this.channel = channel;
	this.server = server;
	
	this.load = function(moduleSettings)
	{
		for(l in moduleSettings)
		{
			var moduleName = moduleSettings[l];
			loadModule(moduleName);
		}
	}
	
	this.loadModule = function(moduleName)
	{
		var module = require("./modules/"+moduleName+".js").module;
		var moduleInstance = new module();
		moduleInstance.server = this.server;
		moduleInstance.channel = this.channel;
		moduleInstance.container = this;
		servers[i].modules.push(moduleInstance);
	}
	
	this.start = function()
	{
		run("onModuleStart");
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
				module[func].apply(module, arguments);
			}
		}
	}

}
