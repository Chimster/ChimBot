// Variable declaration //

var Discord = require("discord.js"),
	isPlaying = 0,
	audioQueue = [],
	discr,
	commandContent,
	config = require("./config.json"),
	queueInit = false,
	joinedVoice,
	test4;

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
	var currentTime = "[" + hour + ":" + min + ":" + sec;
	logTopic = logTopic.toUpperCase() + "]";
	console.log(currentTime + " " + logTopic + " " + logString);
}

var setAvatar = function (link){
	var b64img = require('request').defaults({encoding: null});
	b64img.get(link, (error, response, body) => {
		if(!error && response.statusCode == 200) {
			var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
			bot.setAvatar(data);
		}
	});
}

// Ready event //

bot.on("ready", function() {
	bot.setPlayingGame("dank memes");
	
	setAvatar("http://i.imgur.com/5pZjATJ.png");
});

// Message event //

bot.on("message", function(message) {
	
	var rand = Math.random();
	
	var commandContent = message.content.substr(1);
	
	var audioFiles = {		
		"vinnie": {volume: 0.5},
		"klus": {volume: 512.0},
		"vapenation": {volume: 1.0},
		"egal": {volume: 1.0},
		"nunkel": {volume: 1.0},
		"clutch": {volume: 1.0},
		"vrirnv": {volume: 1.0},
		"nyanpassu": {volume: 1.0},
		"darude": {volume: 1.0},
		"wow": {volume: 1.0},
		"funk": {volume: 0.5},
		"geenprobleem": {volume: 1.0},
		"nigga1": {volume: 1.0},
		"nigga2": {volume: 1.0},
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
		"calm10": {volume: 1.0},
		"hak": {volume: 0.5},
		"tuturu": {volume: 1.0},
		"skank1": {volume: 1.0},
		"skank2": {volume: 1.0},
		"skank3": {volume: 1.0},
		"skank4": {volume: 1.0},
		"skank5": {volume: 1.0},
		"panda": {volume: 1.0},
		"getpsyched": {volume: 1.0},
		"annie": {volume: 1.0},
		"applause1": {volume: 1.0},
		"applause2": {volume: 1.0},
		"applause3": {volume: 1.0},
		"applause4": {volume: 1.0},
		"applause5": {volume: 1.0},
		"applause6": {volume: 1.0},
		"applause7": {volume: 1.0},
		"applause8": {volume: 1.0},
		"applause9": {volume: 1.0},
		"applause10": {volume: 1.0},
		"applause11": {volume: 1.0},
		"applause12": {volume: 1.0},
		"applause13": {volume: 1.0},
		"applause14": {volume: 1.0},
		"applause15": {volume: 1.0},
		"applause16": {volume: 1.0},
		"applause17": {volume: 1.0},
		"applause18": {volume: 1.0},
		"applause19": {volume: 1.0},
		"applause20": {volume: 1.0},
		"applause21": {volume: 1.0},
		"applause22": {volume: 1.0},
		"applause23": {volume: 1.0},
		"applause24": {volume: 1.0},
		"applause25": {volume: 1.0},
		"drumroll": {volume: 1.0},
		"elevator": {volume: 1.0},
		"hooray": {volume: 1.0},
		"blyat": {volume: 1.0},
		"skype1": {volume: 1.0},
		"skype2": {volume: 1.0},
		"skype3": {volume: 1.0},
		"skype4": {volume: 1.0},
		"skype5": {volume: 1.0},
		"skype6": {volume: 1.0},
		"skype7": {volume: 1.0},
		"skype8": {volume: 1.0},
		"skype9": {volume: 1.0},
		"skype10": {volume: 1.0},
		"skype11": {volume: 1.0},
		"skype12": {volume: 1.0},
		"skype13": {volume: 1.0},
		"skype14": {volume: 1.0},
		"skype15": {volume: 1.0},
		"skype16": {volume: 1.0},
		"skype17": {volume: 1.0},
		"skype18": {volume: 1.0}
	}
	
	var aliases = {

	}
	
	var randDiscr = {
		"meer": 5,
		"paprikachips": 2,
		"hereinmygarage": 6,
		"justdoit": 10,
		"calm": 10,
		"skank": 5,
		"applause": 25,
		"nigga": 2,
		"skype": 18
	}

	var getVoice = function() {
		vCLength = bot.voiceConnections.length;
		console.log(vCLength);
		console.log("Checking all voice connections...");
		for(var i = 0; i < vCLength; i++) {
			console.log(i);
			if (bot.voiceConnections[i].server.equals(message.channel.server)) {
				console.log("Bot already in a voice channel on server message was sent on. Returning said voiceConnection.");
				return bot.voiceConnections[i];
			}
		}
		console.log("done, nothing found");
		if(message.author.voiceChannel) {
			if (message.author.voiceChannel.server.equals(message.channel.server)) {
				console.log("Bot not in a voice channel on server message was sent on. Joining voice channel of author and returning said voiceConnection.");
				bot.joinVoiceChannel(message.author.voiceChannel, function(error, voice) {
					
				});
			}
			else {
				bot.reply(message, "You have to be in a voice channel on **this** server to use that command.");
				return;
			}
		}
		else {
			bot.reply(message, "You have to be in a voice channel to use that command.");
			return;
		}
	}
	
	// Play audio function //
	
	var playAudio = function() {	
		bot.joinVoiceChannel(message.author.voiceChannel, function(error, voice) {
			if(!bot.voiceConnection) {
				consoleLog("connection", "Connected to voice channel" + " " + message.author.voiceChannel);
			}
			voice.playFile("media\\" + "\\" + audioQueue[0] + ".ogg", {volume: audioFiles[audioQueue[0]].volume}, function(error, intent) {
				intent.on("end", function() {
					audioQueue.splice(0,1);	
					if(audioQueue.length > 0) {
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
	
	if(message.content === "!chimbot") {
		bot.sendMessage(message.channel, "ChimBot is connected to this server. Type `!cb help` for a list of commands.");
	}

	if(message.content.includes("!cb")) {
		if(message.content === "!cb") {
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
	
	if(message.content === "!cb join") {
		bot.joinVoiceChannel(message.author.voiceChannel);
	}
	
	if(message.content === "!cb leave") {
		if(bot.voiceConnection){
			bot.voiceConnection.stopPlaying();
		}
		isPlaying = 0;
		audioQueue = [];
		bot.leaveVoiceChannel(message.author.voiceChannel);
	}
	
	if(message.content === "(╯°□°）╯︵ ┻━┻") {
		bot.sendMessage(message.channel, "┬─┬﻿ ノ( ゜-゜ノ)")
	}
	if(message.content.toLowerCase().includes("riot")) {
		if(message.author != bot.user) {
			bot.sendMessage(message.channel, "༼ つ ◕_◕ ༽つ RIOT ༼ つ ◕_◕ ༽つ");
		}
	}
	
	if(message.content === "!id") {
		bot.reply(message, "your id is: " + "**" + message.author.id + "**");
	}
	
	if(audioFiles.hasOwnProperty(commandContent)) {
		if(message.content !== "!" + commandContent) {return}
		audioQueue.push(commandContent);
		if (isPlaying == 0) {
			playAudio();
		}
	}
	
	if(randDiscr.hasOwnProperty(commandContent)) {
		if(message.content !== "!" + commandContent) {return}
		var max = randDiscr[commandContent];
		audioQueue.push(commandContent + Math.floor(rand * (max) + 1));
		if (isPlaying == 0) {
			playAudio();
		}
	}
	
});

// Bot login //

bot.loginWithToken(config.token, function(error, token) {
	
	if(error) console.log(error);
	
	else consoleLog("connection", "Connected sucessfully with token \"" + token + "\"");
	
});