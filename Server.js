
exports.Server = function(address, port)
{
	this.address = address;
	this.port = port;

	this.nick = "NinaBot";
	
	this.channels = [];

	this.connected = false;
	
	// Connects to the server and starts listening for incoming data.
	this.connect = function()
	{
		//Check that we're not connected
		if(connected)
			throw new Error("Connecting to an already connected server");
		
		console.log("Connecting to "+this.address+":"+this.port+"...");

		var self = this;
		
		this.socket = net.createConnection(this.port, this.address);
		this.socket.parent = this;
		this.socket.on("connect", function() { 
			// Line reading below from
			// https://github.com/martynsmith/node-irc/blob/master/lib/irc.js
		
			var buffer = '';
			this.socket.addListener("data", function (chunk)
			{
				buffer += chunk;
				var lines = buffer.split("\r\n");
				buffer = lines.pop();
				lines.forEach(function (line)
				{
					var message = parseMessage(line, false);
					self.gotMessage(message);
				});
			});
		});
		connected = true; 
	}

	this.gotRawMessage = function(message)
	{
		//TODO
		//Join channels and add them to this.channels
		//Process messages, pass them to channels.
	}

	//TODO: Functions to say stuff, send PMs, maybe more.
	//But we should only add what we need. No bloat :)

	/*
	* parseMessage(line, stripColors)
	*
	* takes a raw "line" from the IRC server and turns it into an object with
	* useful keys
	* 
	* From: https://github.com/martynsmith/node-irc/blob/master/lib/irc.js
	*/
	function parseMessage(line, stripColors) { // {{{
		var message = {};
		var match;

		if (stripColors) {
		    line = line.replace(/[\x02\x1f\x16\x0f]|\x03\d{0,2}(?:,\d{0,2})?/g, "");
		}

		// Parse prefix
		if ( match = line.match(/^:([^ ]+) +/) ) {
		    message.prefix = match[1];
		    line = line.replace(/^:[^ ]+ +/, '');
		    if ( match = message.prefix.match(/^([_a-zA-Z0-9\[\]\\`^{}|-]*)(!([^@]+)@(.*))?$/) ) {
		        message.nick = match[1];
		        message.user = match[3];
		        message.host = match[4];
		    }
		    else {
		        message.server = message.prefix;
		    }
		}

		// Parse command
		match = line.match(/^([^ ]+) */);
		message.command = match[1];
		message.rawCommand = match[1];
		message.commandType = 'normal';
		line = line.replace(/^[^ ]+ +/, '');

		if ( replyFor[message.rawCommand] ) {
		    message.command = replyFor[message.rawCommand].name;
		    message.commandType = replyFor[message.rawCommand].type;
		}

		message.args = [];
		var middle, trailing;

		// Parse parameters
		if ( line.indexOf(':') != -1 ) {
		    var index = line.indexOf(':');
		    middle = line.substr(0, index).replace(/ +$/, "");
		    trailing = line.substr(index+1);
		}
		else {
		    middle = line;
		}

		if ( middle.length )
		    message.args = middle.split(/ +/);

		if ( typeof(trailing) != 'undefined' && trailing.length )
		    message.args.push(trailing);

		return message;
	}

}

