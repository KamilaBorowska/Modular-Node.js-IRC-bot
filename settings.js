//TODO: Replace this with JSON

exports.settings = {
	globalNick: "NinaBot",
	globalUserName: "bot",
	globalRealName: "Nina's bot",

	defaultCommandPrefix: ":nb ",

	//These modules will be loaded in all channels.
	globalServModules: ["ctcp"],
	globalModules: ['yesno', 'chance'],
	
	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			modules: [],
			channels: {
				"#nsmbhacking": {
					modules: ['report'],
					moduleSettings: {
						report: {
							useFile: "./modules/report/nsmbhd.sock"
						}
					}
				}

			}
		}
	}
}
