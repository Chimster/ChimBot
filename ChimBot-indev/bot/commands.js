module.exports = {
  "chimbot": {
    aliases: ["cb"],
    deleteCommand: false,
    process: function(bot, message) {

      bot.sendMessage(message, "Hi there, " + message.author.username);
    },
    subCommands: {
      "help": {
        aliases: ["h"],
        deleteCommand: true,
        process: function(bot, message) {
          bot.sendMessage(message.author, "This is where all the commands will go.");
        }
      },
      "info": {
        aliases: ["i", "about", "a"],
        deleteCommand: false,
        process: function(bot, message) {
          bot.sendMessage(message, "ChimBot is a bot which brings tons of sounds to your server")
        }
      },
      "ping": {
        aliases: ["p"],
        deleteCommand: false,
        process: function(bot, message) {
          bot.sendMessage(message, "pong", function(error, sentMessage) {
            bot.updateMessage(sentMessage, sentMessage.timestamp - message.timestamp + "ms");
          });
        }
      }
    }
  },
  /*"test": {
    aliases: ["t"],
    deleteCommand: false,
    process: function(){

    }
  }*/
}
