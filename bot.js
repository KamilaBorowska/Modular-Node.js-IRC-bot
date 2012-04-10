//Node.js IRC bot -- second attempt

tty = require("tty");
os = require("os");

moduleSystem = require("./moduleSystem.js");
irc = require("./irc.js");
settings = require("./settings.js");

moduleSystem.newBucket("internal", false);
moduleSystem.newBucket("ircProtocol", true);

