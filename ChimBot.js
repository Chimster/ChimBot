// Variable declaration //

var Discord = require("discord.js"),
	isPlaying = false,
	audioQueue = [],
	discr,
	commandContent,
	config = require("./config.json");

// Bot declaration //

var bot = new Discord.Client({autoReconnect: true});

// Variable declaration //

var isPlaying = false;

var audioQueue = [];

var discr;

var commandContent;

// Console log function //

var consoleLog = function(logTopic, logString) {
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
	var currentTime = "[" + hour + ":" + min + ":" + sec + "]";
	logTopic = "[" + logTopic.substr(0, 1).toUpperCase() + logTopic.substr(1) + "]";
	console.log(currentTime + logTopic + " " + logString);
}

var setAvatar = function (link){
	var b64img = require('request').defaults({encoding: null});
	b64img.get(link, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
			bot.setAvatar(data);
		}
	});
}

// Ready event //

bot.on("ready", function() {
	
	bot.setPlayingGame("dank memes");
	
	setAvatar("http://i.imgur.com/cEHqXZm.png");

});

// Message event //

bot.on("message", function(message) {
	
	var rand = Math.random();
	
	var commandContent = message.content.substr(1);
	
	var audioFile = {		
		"vinnie": {volume: 0.5},
		"klus": {volume: 1.0},
		"vapenation": {volume: 1.0},
		"egal": {volume: 1.0},
		"nunkel": {volume: 1.0},
		"clutch": {volume: 1.0},
		"vrirnv": {volume: 1.0},
		"nyanpassu": {volume: 1.0},
		"darude": {volume: 1.0},
		"wow": {volume: 512.0},
		"funk": {volume: 0.5},
		"geenprobleem": {volume: 1.0},
		"nigga": {volume: 1.0},
		"tactics": {volume: 1.0},
		"noice": {volume: 1.0},
		"meer1": {volume: 1.0},
		"meer2": {volume: 1.0},
		"meer3": {volume: 1.0},
		"meer4": {volume: 1.0},
		"meer5": {volume: 1.0},
		"paprikachips1": {volume: 1.0},
		"paprikachips2": {volume: 1.0},
		"hereinmygarage1": {volume: 1.0},
		"hereinmygarage2": {volume: 1.0},
		"hereinmygarage3": {volume: 1.0},
		"hereinmygarage4": {volume: 1.0},
		"hereinmygarage5": {volume: 1.0},
		"hereinmygarage6": {volume: 1.0},
		"justdoit1": {volume: 1.0},
		"justdoit2": {volume: 1.0},
		"justdoit3": {volume: 1.0},
		"justdoit4": {volume: 1.0},
		"justdoit5": {volume: 1.0},
		"justdoit6": {volume: 1.0},
		"justdoit7": {volume: 1.0},
		"justdoit8": {volume: 1.0},
		"justdoit9": {volume: 1.0},
		"justdoit10": {volume: 1.0},
		"calm1": {volume: 1.0},
		"calm2": {volume: 1.0},
		"calm3": {volume: 1.0},
		"calm4": {volume: 1.0},
		"calm5": {volume: 1.0},
		"calm6": {volume: 1.0},
		"calm7": {volume: 1.0},
		"calm8": {volume: 1.0},
		"calm9": {volume: 1.0},
		"calm10": {volume: 1.0}
	};
	
	var randAudio = {
		"meer": 5,
		"paprikachips": 2,
		"hereinmygarage": 6,
		"justdoit": 10,
		"calm": 10
	}
	
	// Play audio function //

	var playAudio = function() {	
		bot.joinVoiceChannel(message.author.voiceChannel, function(error, voice) {
			if(bot.voiceConnection == 0) {
				consoleLog("connection", "Connected to voice channel" + " " + message.author.voiceChannel);
			}
			voice.playFile("media\\" + "\\" + audioQueue[0] + ".ogg", {volume: audioFile[audioQueue[0]].volume}, function(error, intent) {
				intent.on("end", function() {
					audioQueue.splice(0,1);	
					if (audioQueue.length > 0) {
						playAudio();
					}
					else {
						isPlaying = 0;
						bot.leaveVoiceChannel(message.author.voiceChannel);
						consoleLog("connection", "Disconnected from voice channel" + " " + message.author.voiceChannel);
					}
				});
				console.log(error);
			});
			isPlaying = 1;
			consoleLog("voice", "Now playing" + " " + audioQueue[0] + ".ogg" + " " + "for" + " " + message.author.voiceChannel);
		});
	}
	
	if (message.content === "!chimbot") {
		bot.sendMessage(message.channel, "ChimBot is connected to this server. Type `!cb help` for a list of commands.");
	}

	if (message.content.includes("!cb")) {
		if (message.content === "!cb") {
			bot.sendMessage(message.channel, "ChimBot is connected to this server. Type `!cb help` for a list of commands.");		
		}
		else if (message.content === "!cb help") {
			bot.sendMessage(message.channel, "List of commands: `!chimbot`, `!cb`, `!vinnie`, ``");
		}
	}
	
	if (message.content === "!cb skip") {
		if(bot.voiceConnection){
			bot.voiceConnection.stopPlaying();
		}
	}
	
	if (message.content === "(╯°□°）╯︵ ┻━┻") {
		bot.sendMessage(message.channel, "┬─┬﻿ ノ( ゜-゜ノ)")
	}
	if (message.content.toLowerCase().includes("riot")) {
		if (message.author != bot.user) {
			bot.sendMessage(message.channel, "༼ つ ◕_◕ ༽つ RIOT ༼ つ ◕_◕ ༽つ");
		}
	}
	
	if (message.content === "!id") {
		bot.reply(message, "your id is: " + "**" + message.author.id + "**");
	}
	
	if (audioFile.hasOwnProperty(commandContent)) {
		audioQueue.push(commandContent);
		if (isPlaying == 0) {
			playAudio();
		}
	}
	
	if (randAudio.hasOwnProperty(commandContent)) {
		var max = randAudio[commandContent];
		audioQueue.push(commandContent + Math.floor(rand * (max) + 1));
		if (isPlaying == 0) {
			playAudio();
		}
	}
	
	if(message.content.includes("noice")){
		audioQueue.push("noice");
		if (isPlaying == 0) {
			playAudio();
		};
	}
	
	if(message.content === "!cb join") {
		bot.joinVoiceChannel(message.author.voiceChannel);
		console.log(bot.voiceConnection);
	}
	
	if(message.content === "!cb leave") {
		if(bot.voiceConnection){
			bot.voiceConnection.stopPlaying();
		}
		isPlaying = 0;
		audioQueue = [];
		bot.leaveVoiceChannel(message.author.voiceChannel);
	}

	if (message.content === "!test") {
		var splitMessage = message.content.split(" ");
		console.log(splitMessage[0]);
		var rapChallenged = splitMessage[1];
		console.log(rapChallenged);
		if (rapChallenged) { 
			rapChallenged = rapChallenged.replace("@", "");
			rapChallenged = rapChallenged.replace("\>", "");
			rapChallenged = rapChallenged.replace("\<", "");
		}
		else {
		}
		console.log(rapChallenged);
		console.log(bot.users.getAll("status", "online"));
		bot.users.get("id", rapChallenged);
		if (bot.users.getAll("status", "online").indexOf(bot.users.get("id", rapChallenged)) > -1) {
			console.log("yes");
		} 
		else {
			console.log("no");
		}
		if (bot.users.get("id", rapChallenged) == null) {
			consoleLog("");	
		}
		console.log(bot.users.getAll("voiceChannel", message.author.voiceChannel));
	}
	
	if (message.content === "!test2") {
		console.log(message.author.voiceChannel.server);
		bot.createChannel(message.channel.server, "Elevator", "voice");
		// console.log(bot.voiceChannels.get("name", "Elevator"));
		console.log(bot.voiceChannel.get("name", "Elevator"));
	}
	
	if (message.content === "!test3") {
		if(message.author.voiceChannel) {
			bot.createChannel(message.author.server, "Elevator", voice);
			var userQueue = bot.users.getAll("voiceChannel", message.author.voiceChannel);
			for (userQueue; userQueue.length > -1; audioQueue.splice(0,1)) {
				bot.moveMember(userQueue[0], bot.voiceChannel);
			}
		}
	}
	
});

// Bot login //

bot.loginWithToken(config.token, function(error, token) {
	
	if(error) console.log(error);
	
	else consoleLog("connection", "Connected sucessfully with token \"" + token + "\"");
	
});