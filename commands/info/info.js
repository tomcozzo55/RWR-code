const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() 
  .setName('bot-info')
  .setDescription('Displays Information about RWR bot.'),
  async execute(interaction) {
		await interaction.deferReply();
		const infoEmbed = new EmbedBuilder()
		.setTitle(interaction.client.user.username.toUpperCase() + ' INFO')
		.setDescription('RWR Team Bot user Information\n\`\`\`\nDeveloper: Haya-pro12#5388\nRam used: 45/512mb\nBuilt-in features: Fortnite system, anti-swearing, anti racism, auto-mod, fun games, slash cmds\n\`\`\`')
			.setImage('https://cdn.discordapp.com/attachments/1067842230854897746/1085278841871798362/1678821014538.png')
			.setURL('https://www.youtube.com/@RoamWithRebble')
			.setThumbnail('https://cdn.discordapp.com/attachments/1067842230854897746/1082031182277001216/1678037780713.png')
    .setColor('#8C00A8')
	await interaction.editReply({
		embeds: [
			infoEmbed
		]
	})
  },
};