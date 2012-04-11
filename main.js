var srv = require("./Server.js");
var chn = require("./Channel.js");

var testModule = function()
{
	this.onMessage = function(user, message)
	{
		this.channel.say(user+" said: "+message);
	}
}
//TODO: Make the setup from the configuration instead of hardcoding everything.

var server = new srv.Server("irc.digibase.ca", 6667);
var chan = new chn.Channel(server, "#nsmbhacking");
chan.modules.push(new testModule());
server.addChannel(chan);
server.connect();

