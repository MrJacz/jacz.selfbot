const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'changenick',
            runIn: ['text'],
            permLevel: 10,
            botPerms: ['CHANGE_NICKNAME'],
            usage: '<nickname:string>'
        });
    }

    async run(msg, [nickname]) {
        return msg.guild.me.setNickname(nickname, {reason: "Jacz.selfbot changenickname command"}).then(() => msg.edit(`**Prefix changed to \`${nickname}\`**`)).catch(console.error);
    }
};