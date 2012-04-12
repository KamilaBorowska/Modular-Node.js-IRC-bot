//TODO: Replace this with JSON

exports.settings = {
	globalNick: "NinaBotV2",
	globalUserName: "bot",
	globalRealName: "NinaBot",

	defaultCommandPrefix: ":nb ",

	//These modules will be loaded in all channels.
	globalServModules: ["ctcp"],
	globalModules: [],
	
	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			modules: [],
			channels: {
				"#nsmbhacking" : ["yesno", "chance"]
			}
		}
	}
}
