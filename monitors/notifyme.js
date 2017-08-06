const Discord = require('discord.js');
const {
    Monitor
} = require('klasa');
const hook = new Discord.WebhookClient(client.config.webhookid, client.config.webhooktoken);
const {
    stripIndents
} = require('common-tags');
module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: 'notifyme',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true
        });
    }

    run(msg) {
        const keywords = ['jacz', 'mrjacz'];
        if (msg.author.id === msg.client.user.id) return;
        if (keywords.some(word => msg.content.toLowerCase().includes(word))) {
            hook.send(stripIndents `
				${msg.client.user.toString()}
				User **${msg.author.username}** mentioned you in **${msg.guild.name}**
				**Channel:** ${msg.channel.toString()}
				**Content:**
				${msg.content}
			`);
        }
    }



};