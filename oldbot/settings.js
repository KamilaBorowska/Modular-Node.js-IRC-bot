console.log("Loaded settings.");

exports.settings = {
	defaultNick: "NinaBot2",
	servers: {
/*		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			moduleOptions: {
				channels: ["#abxd", "#nsmbhacking"]
			}
		}
*/		localhost: {
			address: "irc.digibase.ca",
			port: 6667,
			channels: ["#nsmbhacking"]
		}
	},
	username: "nina",
	realname: "Bot",
	moduleSystem: {
		path: "./modules/", //This needs a / at the end.
		defaultModules: ['consoleLog'],
		blacklisted: []
	}
};
