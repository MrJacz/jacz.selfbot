const Discord = require('discord.js');
const {
    Monitor
} = require('klasa');
const {
    stripIndents
} = require('common-tags');
module.exports = class NotifyMe extends Monitor {
    constructor(client, ...args) {
        super(client, ...args, {
            name: 'notifyme',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true
        });
    }

    run(msg) {
        let client = msg.client;
        const hook = new Discord.WebhookClient(client.config.webhookid, client.config.webhooktoken);
        const keywords = ['jacz', 'mrjacz'];
        if (msg.author.id === msg.client.user.id) return;
        if (keywords.some(word => msg.content.toLowerCase().includes(word))) {
            hook.send(stripIndents `
				${msg.client.user.toString()}
				User **${msg.author.username}** mentioned you in **${msg.guild.name || msg.channel.name}**
				**Channel:** ${msg.channel.toString()}
				**Content:**
				${msg.content}
			`);
        }
    }



};