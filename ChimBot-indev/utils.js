exports.consoleLog = function(logTopic, logString) {
	var date = new Date();
	if (date.getHours().toString().length == 1) {
		var hour = "0" + date.getHours();
	}
	else {
		var hour = date.getHours();
	}
	if (date.getMinutes().toString().length == 1) {
		var min = "0" + date.getMinutes();
	}
	else {
		var min = date.getMinutes();
	}
	if (date.getSeconds().toString().length == 1) {
		var sec = "0" + date.getSeconds();
	}
	else {
		var sec = date.getSeconds();
	}
	var currentTime = hour + ":" + min + ":" + sec;
	logTopic = logTopic.toUpperCase();
	console.log("[" + currentTime + " " + logTopic + "]" + " " + logString);
}

exports.updatePlayingGame = function(bot) {
	var totalSounds = 0;
	for(var i = 0; i < bot.voiceConnections.length; i++) {
		if(bot.voiceConnections[i].playing == 1) {
			totalSounds++;
		}
	}
	if(totalSounds == 0) {
		bot.setPlayingGame(null);
	}
	else if(totalSounds == 1) {
		bot.setPlayingGame(totalSounds + " " + "sound");
	}
	else {
		bot.setPlayingGame(totalSounds + " " + "sounds");
	}
}
