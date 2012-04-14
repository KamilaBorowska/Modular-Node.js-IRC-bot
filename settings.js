//TODO: Replace this with JSON

exports.settings = {
	globalNick: "NinaBot",
	globalUserName: "bot",
	globalRealName: "Nina's bot",

	defaultCommandPrefix: ":nb ",

	//These modules will be loaded in all channels.
	globalServModules: ["ctcp"],
	globalModules: ['tell', 'yesno'],
	
	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			modules: [],
			channels: {
				"#nsmbhacking" : ['chance']
			}
		}
	}
}
