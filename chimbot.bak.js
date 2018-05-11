var Discord = require("discord.js");

var bot = new Discord.Client({autoReconnect: true});

bot.on("ready", function() {
	bot.setPlayingGame("dank memes");
	var setAvatar = function (link){
		var b64img = require('request').defaults({encoding: null});
		b64img.get(link, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
			bot.setAvatar(data);
		}
	});
	}
	setAvatar("http://i.imgur.com/BElUtev.png");
});




	
// Commands

bot.on("message", function(message) {
	
	// 
	
	var bass = 0;
	var audio;
	var rand = Math.random();
	
	// Commands for text chat
	
	// !chimbot
	if(message.content === "!chimbot") {
		bot.sendMessage(message.channel, "ChimBot is connected to this server. Type `!cb help` for a list of commands.");
	}
	// !cb
	if(message.content.includes("!cb")) {
		if (message.content === "!cb") {
			bot.sendMessage(message.channel, "ChimBot is connected to this server. Type `!cb help` for a list of commands.");		
		}
		else if (message.content === "!cb help") {
			bot.sendMessage(message.channel, "List of commands: `!chimbot`, `!cb`, `!vinnie`, ``");
		}
	}
	
	
	if (message.content === "(╯°□°）╯︵ ┻━┻") {
		bot.sendMessage(message.channel, "┬─┬﻿ ノ( ゜-゜ノ)")
	}
	if (message.content.toLowerCase().includes("riot")) {
		if (message.author != bot.user) {
			bot.sendMessage(message.channel, "༼ つ ◕_◕ ༽つ");
			bot.sendMessage(message.channel, "RIOT");
			bot.sendMessage(message.channel, "༼ つ ◕_◕ ༽つ");
		}
	}
	
	if (message.content === "!id") {
		bot.sendMessage(message.channel, message.author.id);
	}
	
	// Commands for voice chat
	
	var audioCommand = ["vinnie", "klus", "bassboost", "vapenation", "egal", "nunkel", "clutch", "calm", "elevator", "vrirnv", "nyanpassu", "darude", "wow"];
	
	function findAudioCommand(query) {
		return query === message.content.substr(1);
	}
	
	var playAudio = function(audio) {
		bot.joinVoiceChannel(message.author.voiceChannel, function(error, voice) {
			voice.playFile("media\\" + "\\" + audio + ".ogg", {volume:1.0}, function(error, intent) {
				intent.on("end", function() {
					bot.leaveVoiceChannel(message.author.voiceChannel);
				});
			});
		});
	}
	
	if (message.content === "!" + audioCommand.find(findAudioCommand)) {
		playAudio(audioCommand.find(findAudioCommand));
	}

	if (message.content === "!meer") {
			if (rand <= 0.12) {
				var audio = "media\\meer2.ogg";
			}
			else if (rand <= 0.24){
				var audio = "media\\meer3.ogg";
			}
			else if (rand <= 0.36) {
				var audio = "media\\meer4.ogg";
			}
			else if (rand <= 0.48) {
				var audio = "media\\meer5.ogg"
			}
			else {
				var audio = "media\\meer1.ogg";
		}
	}
	if (message.content === "!paprikachips") {
			if (rand <= 0.2) {
				var meer = "media\\paprikachips2.ogg";
			}
			else {
				var meer = "media\\paprikachips1.ogg";
			}
	}
	if (message.content === "!hereinmygarage", message.content === "!himg") {
			if (rand <= 0.165) {
				var himg = "media\\hereinmygarage1.ogg";
			}
			else if (rand <= 0.33){
				var himg = "media\\hereinmygarage2.ogg";
			}
			else if (rand <= 0.495){
				var himg = "media\\hereinmygarage3.ogg";
			}
			else if (rand <= 0.66) {
				var himg = "media\\hereinmygarage4.ogg";
			}
			else if (rand <= 0.825) {
				var himg = "media\\hereinmygarage5.ogg"
			}
			else {
				var himg = "media\\hereinmygarage6.ogg";
			}
	}
	if (message.content === "!justdoit", message.content === "!jdi") {
			if (rand <= 0.1) {
				var jdi = "media\\justdoit1.ogg";
				var jdii = "media\\justdoit1.gif";
			}
			else if (rand <= 0.2){
				var jdi = "media\\justdoit2.ogg";
				var jdii = "media\\justdoit2.gif";
			}
			else if (rand <= 0.3){
				var jdi = "media\\justdoit3.ogg";
				var jdii = "media\\justdoit3.gif";
			}
			else if (rand <= 0.4) {
				var jdi = "media\\justdoit4.ogg";
				var jdii = "media\\justdoit4.gif";
			}
			else if (rand <= 0.5) {
				var jdi = "media\\justdoit5.ogg";
				var jdii = "media\\justdoit5.gif";
			}
			else if (rand <= 0.6) {
				var jdi = "media\\justdoit6.ogg";
				var jdii = "media\\justdoit6.gif";
			}
			else if (rand <= 0.7) {
				var jdi = "media\\justdoit7.ogg";
				var jdii = "media\\justdoit7.gif";
			}
			else if (rand <= 0.8) {
				var jdi = "media\\justdoit8.ogg";
				var jdii = "media\\justdoit8.gif";
			}
			else if (rand <= 0.9) {
				var jdi = "media\\justdoit9.ogg";
				var jdii = "media\\justdoit9.gif";
			}
			else {
				var jdi = "media\\justdoit10.ogg";
				var jdii = "media\\justdoit10.gif";
			}
	}
	
	if(message.content.includes("noice")){
		playAudio("noice")
	}
	if(message.content === "!cb join") {
		bot.joinVoiceChannel(message.author.voiceChannel);
	}
	if(message.content === "!cb leave") {
		bot.leaveVoiceChannel(message.author.voiceChannel);
	}
	if(message.content.includes("!tes")) {
		var rapHost = message.author;
		var rapCont = message.content.substr(5);
		console.log(message.author.id);
		console.log(bot.users.has("id", message.author.id));
		// if(usersOnline.indexOf(rapHost)) {
		// 	console.log(rapHost);
		// }
		// else {
		// 	console.log("User not found or connected to server");
		// }
	}
	if (message.content === "!users") {
		console.log(bot.users.get("id", message.author.id));
	}
	if(message.content.includes("!")) {console.log("[Command] " + message.author.username + " triggered " + message.content);}
	
});

bot.loginWithToken("MTY4MzE4ODY3MDIwNDQ3NzQ1.CgKGMw.KIU9Zb5yNmDlUX7eiVcrMBGl9G8", function(error, token) {
	if(error) console.log(error);
	else console.log("[Connection] Connected sucessfully with token \"" + token + "\"");
});