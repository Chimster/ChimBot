var Discord = require("discord.js"),
		voice = require("./voice/voice.js"),
		commands = require("./bot/commands.js")
		config = require("./bot/config.json"),
		audioFiles = require("./voice/audiofiles.json"),
		utils = require("./utils.js"),
		chalk = require("chalk"),
		clk = new chalk.constructor({enabled: true});

var bot = new Discord.Client({autoReconnect: true});

bot.on("ready", function() {
	bot.setPlayingGame(null);
	utils.consoleLog("system", "Bot ready to operate.");
});

bot.on("message", function(message) {
	if(message.content.startsWith(config.command_prefix)) {
		var command = message.content.split(" ");
		command[0] = command[0].substr(1);

		if(commands.hasOwnProperty(command[0])) {
			if(command.length == 1) {
				commands[command[0]].process(bot, message);
			}
			else {
				if(commands[command[0]].subCommands.hasOwnProperty(command[1])) {
					commands[command[0]].subCommands[command[1]].process(bot, message);
				}
				else {
					for(var subCmd in commands[command[0]].subCommands) {
						if(commands[command[0]].subCommands[subCmd].aliases.indexOf(command[1]) > -1) {
							commands[command[0]].subCommands[subCmd].process(bot, message);
						}
					}
				}
			}
		}
		else {
			for(var cmd in commands) {
				if(commands[cmd].aliases.indexOf(command[0]) > -1) {
					if(command.length == 1) {
						commands[cmd].process(bot, message);
					}
					else {
						if(commands[cmd].subCommands.hasOwnProperty(command[1])) {
							commands[cmd].subCommands[command[1]].process(bot, message);
						}
						else {
							for(var subCmd in commands[cmd].subCommands) {
								if(commands[cmd].subCommands[subCmd].aliases.indexOf(command[1]) > -1) {
									commands[cmd].subCommands[subCmd].process(bot, message);
								}
							}
						}
					}
				}
			}
		}

		if(audioFiles.audioFiles.hasOwnProperty(command[0]) || audioFiles.aliases.hasOwnProperty[command[0]]) {
			if(message.content !== config.command_prefix + command[0]) {return}
			if(audioFiles.audioFiles[command[0]].discr) {
				var audioFile = command[0] + Math.floor(Math.random() * (audioFiles[command[0]].discr) + 1);
			}
			else {
				var audioFile = command[0];
			}
			if(message.author.voiceChannel) {
				if(message.author.voiceChannel.server.equals(message.channel.server)) {
					var connection = voice.getVoice(bot, message);
					if(!connection) {
							voice.joinVoice(bot, message, function(connection) {
								var queue = voice.getAudioQueue(bot, message);
								queue.push(audioFile);
								voice.playAudioQueue(bot, message, connection, queue);
							});
					}
					else if(connection.playing) {
						var queue = voice.getAudioQueue(bot, message);
						queue.push(audioFile);
					}
					else {
						var queue = voice.getAudioQueue(bot, message);
						queue.push(audioFile);
						voice.playAudioQueue(bot, message, connection, queue);
					}
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
			bot.deleteMessage(message, {"wait": 5000})
	  }
	}

	if(message.content === config.command_prefix + "cb skip") {
		var connection = voice.getVoice(message);
		if(!message.author.voiceChannel) {
			bot.reply(message, "You have to be in a voice channel to use that command.");
		}
		else if(!connection) {
			bot.reply(message, "I'm not in a voice channel on this server.");
		}
		else if(voice.voiceChannel.equals(message.author.voiceChannel) == 0) {
			bot.reply(message, "You have to be in the same voice channel as me to use that command.");
		}
		else if(voice.playing == 1) {
			voice.stopPlaying();
		}
		else {
			bot.reply(message, "I'm not playing anything.");
		}
		bot.deleteMessage(message, {"wait": 1000});
	}

	if(message.content === "(╯°□°）╯︵ ┻━┻") {
		bot.sendMessage(message.channel, "┬─┬﻿ ノ( ゜-゜ノ)");
	}

	if(message.content.toLowerCase().includes("riot")) {
		if (message.author != bot.user) {
			bot.sendMessage(message.channel, "༼ つ ◕_◕ ༽つ RIOT ༼ つ ◕_◕ ༽つ");
		}
	}

	if(message.content === config.command_prefix + "cb join") {
		voice.joinVoice(bot, message, function(connection) {
			utils.consoleLog("voice",
				"Connected to voice channel \"" + connection.voiceChannel.name + "\""
				+ "(" + connection.voiceChannel.id + ") on server"
				+ "\"" + connection.server.name + "\"" + "(" + connection.server.id + ")."
				+ " Currently in " + bot.voiceConnections.length
				+ " voice channels.");
		});
	}

	if(message.content === config.command_prefix + "cb leave") {
		var connection = voice.getVoice();
		if(connection) {
			if(connection.playing == 1) {
				voice.stopPlaying();
			}
			bot.leaveVoiceChannel(connection.voiceChannel, function(){
				consoleLog("voice", "Left voice channel \"" + connection.voiceChannel.name + "\" (" + connection.voiceChannel.id + ") on server \"" + connection.server.name + "\" (" + connection.server.id + ")." + " Currently in " + bot.voiceConnections.length + " voice channels.");
			});
			delete voice.audioQueue[connection.server.id];
		}
	}

	if(message.content === config.command_prefix + "id") {
		bot.reply(message, "your id is: " + "**" + message.author.id + "**");
	}

	if(message.content === config.command_prefix + "cb status") {
		var sec = Math.floor(bot.uptime/1000) % 60;
		var min = Math.floor(bot.uptime/60000) % 60;
		var hour = Math.floor(bot.uptime/3600000);
		if(sec.toString().length == 1) {
			var sec = "0" + sec;
		}
		if(min.toString().length == 1) {
			var min = "0" + min;
		}
		if(hour.toString().length == 1) {
			var hour = "0" + hour;
		}

		var upTime = hour + "h" + min + "m" + sec + "s";
		var servers = bot.servers.length;
		var users = bot.users.length;
		var audioFilesLength = Object.keys(audioFiles).length;
		bot.sendMessage(message.channel, "```Uptime: " + upTime + "\nServers connected to: " + servers + "\nUsers serving: " + users + "\nAmount of sounds: " + audioFilesLength + "```");
	}

});

bot.on("error", function(error) {
	console.log("ERROR");
	console.log(error);
	console.log("END OF ERROR");
});

bot.on("warn", function(warn) {
	console.log("WARN");
	console.log(warn);
	console.log("END OF WARN");
});

bot.on("disconnected", function() {
	// !FIX!
	utils.consoleLog("connection", "Disconnected. Attempting to reconnect.");
	voice.audioQueue = {};
	utils.consoleLog("connection", "Attempting to log in...");
});

// OAuth URL https://discordapp.com/oauth2/authorize?&client_id=186419919213166592

bot.loginWithToken(config.token, function(error, token) {
	if(error) console.log(error);
	else utils.consoleLog("connection", "Connecting with token \"" + token + "\"" + ".");
});
