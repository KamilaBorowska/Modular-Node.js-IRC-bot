//TODO: Replace this with JSON

exports.settings = {
	globalNick: "NinaBot",
	globalUserName: "bot",
	globalRealName: "Nina's bot",

	globalAuthPassword: 'PASSWORD GOES HERE',

	defaultCommandPrefix: ":nb ",

	//These modules will be loaded in all channels.
	globalServModules: ["ctcp"],
	globalModules: ['yesno', 'chance', 'modulemanager'],

	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			modules: [],
			authPassword: 'PASSWORD',
			channels: {
				"#ninabot": {
					modules: ['report', 'authtest'],
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
