exports.moduleBuckets = {};

fs = require("fs");

exports.newBucket = function(bucketName, autoLoads) {
	exports.moduleBuckets[bucketName] = {
		modules: {},
		autoLoads: autoLoads
	}
	if (autoLoads) {
		var paThis = this;
		fs.readdir("./modules/" + bucketName + "/", function(err, files) {
			if (err) return false;
			for (i in files) {
				file = files[i];
				exports.loadModule(aThis.bucketName, files);
			}
		});
	}
}
