const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
		.addUserOption(option => option.setName('user')
									.setDescription('User to check balance of.'))
    .setDescription('Set the channel to send your Rebble bucks balance!'),

  async execute(interaction) {
	await interaction.deferReply()
		const user = interaction.options.getUser('user') ?? interaction.user;
 let wallet = await db.get(`wallet_${user.id}`)
		if(wallet === null) wallet = 0;
 let bank = await db.get(`bank_${user.id}`)
		if(bank === null) bank = 0;

		const total = (Number(wallet) + Number(bank)).toString();

		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
				.setColor('#1922C4')
				.setTitle(`${user.username.toUpperCase()}'S BALANCE`)
				.addFields(
					{name: 'Wallet', value: `\`${wallet} 💲\``, inline: true},
					{name: 'Bank', value: `\`${bank} 💲\``, inline: true},
					{name: 'Total', value: `\`${total} 💲\``, inline: true}
				)
			]
		})
  }
};

