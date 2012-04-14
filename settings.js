//TODO: Replace this with JSON

exports.settings = {
	globalNick: "NinaBot",
	globalUserName: "bot",
	globalRealName: "Nina's bot",

	defaultCommandPrefix: ":nb ",

	//These modules will be loaded in all channels.
	globalServModules: {
		ctcp: {}
	},
	
	globalModules: {
		yesno: {},
		chance: {},
		tell: {}
	},
	
	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			modules: {},
			channels: {
				"#nsmbhacking": {
					report: {port: 8755}
				},
				"#abxd": {
					report: {port: 8756}
				}
			}
		}
	}
}
