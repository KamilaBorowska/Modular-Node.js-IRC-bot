//TODO: Replace this with JSON

exports.settings = {
	globalNick: "NinaBot",
	globalUserName: "bot",
	globalRealName: "Nina's bot",

	globalAuthPassword: 'PASSWORD GOES HERE',

	defaultCommandPrefix: ":nb ",

	//These modules will be loaded in all channels.
<<<<<<< HEAD
	globalServModules: ["ctcp"],
	globalModules: ['yesno', 'chance', 'modulemanager'],

=======
	globalServModules: {
		ctcp: {}
	},
	
	globalModules: {
		yesno: {},
		chance: {},
		tell: {}
	},
	
>>>>>>> bc0ce7722c90fe98f9ab4ba3564daaef864067c1
	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
<<<<<<< HEAD
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
=======
			modules: {},
			channels: {
				"#nsmbhacking": {
					report: {port: 8755}
				},
				"#abxd": {
					report: {port: 8756}
>>>>>>> bc0ce7722c90fe98f9ab4ba3564daaef864067c1
				}
			}
		}
	}
}
