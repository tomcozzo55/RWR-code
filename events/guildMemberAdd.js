const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');
Canvas.registerFont('./assets/fonts/impact.ttf', { family: 'Impact' });
Canvas.registerFont('./assets/fonts/TiltWarp.ttf', { family: 'Tilt Warp' });

module.exports = {
  name: 'guildMemberAdd',
	once: false,
  async execute(member, client, guild) {
		if(member.user.bot) return;
		const channel = member.guild.channels.cache.get('1067842230854897746')
		if(!channel) return;

		//get canvas
const canvas = Canvas.createCanvas(700, 250);
const ctx = canvas.getContext('2d');
const background = await Canvas.loadImage('./assets/card.jpg');
const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'jpg', size: 512}));

		//draw the card
 				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		    ctx.font = 'Bold 30px Impact';
        ctx.fillStyle = '#F8F8F8';
        ctx.textAlign = 'center';
        ctx.fillText(`WELCOME TO ${member.guild.name.toUpperCase()}`, 350, 190);

		    ctx.font = 'Bold 35px Tilt Warp';
        ctx.fillStyle = '#F8F8F8';
        ctx.textAlign = 'center';
        ctx.fillText(member.user.tag.toUpperCase(), 350, 230);

		    ctx.beginPath();
        ctx.arc(350, 80, 60, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 290, 20, 120, 120);

		//make sendable attachment
		const attachment = new AttachmentBuilder(canvas.toBuffer(), {
			name: 'card.png'
		});

		channel.send({
			content: `Hey, ${member} thanks for joining ${member.guild.name}!`,
			files: [attachment]
		});
  }
};
