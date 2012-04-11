exports.module = function()
{
	this.a = "meep";
	this.onMessage = function(user, message)
	{
		this.channel.say(user+" said: "+message);
	}
}

