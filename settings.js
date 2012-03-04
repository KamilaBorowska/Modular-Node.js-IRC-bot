console.log("Loaded settings.");

exports.settings = {
	defaultNick: "NinaBot",
	servers: {
		digibase: {
			address: "irc.digibase.ca",
			port: 6667,
			moduleOptions: {
				channels: ["#abxd", "#nsmbhacking"]
			}
		}
	},
	username: "nina",
	realname: "Bot",
	modDefault: []
};
