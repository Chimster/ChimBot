var utils = require("../utils.js");

var audioQueue = {};

var joinVoice = function(bot, message, callback) {
  bot.joinVoiceChannel(message.author.voiceChannel, function(error, connection) {
    utils.consoleLog("voice", "Connected to voice channel \"" + connection.voiceChannel.name + "\" (" + connection.voiceChannel.id + ") on server \"" + connection.server.name + "\" (" + connection.server.id + ")." + " Currently in " + bot.voiceConnections.length + " voice channels.");
    callback(connection);
  });
}

var getVoice = function(bot, message) {
  for(var i = 0; i < bot.voiceConnections.length; i++) {
    if (bot.voiceConnections[i].server.equals(message.channel.server)) {
      return bot.voiceConnections[i];
    }
  }
  return;
}

// !REWORK!
var getAudioQueue = function(bot, message) {
  if(!audioQueue.hasOwnProperty(message.channel.server.id)) {
    audioQueue[message.channel.server.id] = [];
  }
  return audioQueue[message.channel.server.id];
}

var playAudioQueue = function(bot, message, connection, queue) {
  connection.playFile("audiofiles\\\\" + queue[0] + ".ogg", {volume: 1.0}, function(error, intent) {
    utils.updatePlayingGame(bot);
    intent.on("end", function() {
      var connection = getVoice(bot, message);
      var queue = getAudioQueue(bot, message);
      if(queue.length > 1) {
        queue.splice(0,1);
        playAudioQueue(bot, message, connection, queue);
      }
      else {
        if(connection) {
          bot.leaveVoiceChannel(connection.voiceChannel, function() {
            utils.consoleLog("voice", "Left voice channel \"" + connection.voiceChannel.name + "\" (" + connection.voiceChannel.id + ") on server \"" + connection.server.name + "\" (" + connection.server.id + ")." + " Currently in " + bot.voiceConnections.length + " voice channels.");
          });
          delete audioQueue[connection.server.id];
          utils.updatePlayingGame(bot);
        }
      }
    });
  });
}

exports.audioQueue = audioQueue;
exports.joinVoice = joinVoice;
exports.getVoice = getVoice;
exports.getAudioQueue = getAudioQueue;
exports.playAudioQueue = playAudioQueue;
