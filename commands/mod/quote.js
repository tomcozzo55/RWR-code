const { SlashCommandBuilder, ChannelType } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Set the channel to send the quote message!')
	  .addChannelOption(option => 
											option.setName('channel')
											.setDescription('The channel to get the quotes.')
										 .setRequired(true)
                     .addChannelTypes(ChannelType.GuildText)),
  
  async execute(interaction) {
 await interaction.deferReply()

		const channel = interaction.options.getChannel('channel')

		await db.set(`qc_${interaction.guild.id}`, channel.id).catch(err => {console.log(err)});
		
		await interaction.followUp({
			content: channel.name + ' has been set for daily quote channel.'
		});
		
  }
};
