const { EmbedBuilder } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();
const rq = require(`quote-library`);
const Filter = require("bad-words");
const filter = new Filter({
  list: ['Shit', 'Fuck', 'Bitch', 'Ass', 'Asshole', 'Nigger', 'Nigga'],
});


module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

	if (message.content.toLowerCase().includes('https://') || message.content.toLowerCase().includes('http://')) {
message.delete()
const member = `<@${message.author.id}>`
const links = new EmbedBuilder()
.setDescription(`${member} please do not send links here! 🚫`)
.setColor("#F93A3A")
message.channel.send({ embeds : [links] })
.then(message => {
setTimeout(() => message.delete(), 8000)
})
.catch(console.log)
  }

    await db.get(`qc_${message.guild.id}`).then((id) => {
      const channel = message.guild.channels.cache.get(id);
      if (!channel) return;
      function send() {
        channel.send({ content: `${rq.randomQuote().quoteText}` });
      }
      setInterval(function () {
        var today = new Date();
        var time = today.toLocaleString("en-ZA", {
          timeZone: "Africa/Johannesburg",
        });
        if (time.includes("9:00:00 AM")) {
          send();
        }
       
      }, 5000);
    });
    if (filter.isProfane(message.content.toLowerCase())) {
      const infoEmbed = new EmbedBuilder()
        .setTitle(`${message.author.username}'s Message Removed!`)
        .setDescription(
          `<@${message.author.id}> You have been warned for swearing you may get kicked, banned or even timed out.`
        )
        .setColor("Purple");
      message.channel.send({ embeds: [infoEmbed] });
      message.delete();
    }
  },
};
