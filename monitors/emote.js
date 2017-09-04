const Discord = require('discord.js');
const emojiRegex = require('emoji-regex');
const { Monitor } = require('klasa');

module.exports = class Emotes extends Monitor {
    constructor(client, ...args) {
        super(client, ...args, {
            name: 'emote',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: false
        });
    }

    run(msg) {
        this.client.emotes = new Map([
            ['lenny', '( ͡° ͜ʖ ͡°)'],
            ['concern', 'ಠ_ಠ'],
            ['fish', '><((((\'>'],
            ['sleeping', '(-.-)Zzz...'],
            ['table', '(╯°□°）╯︵ ┻━┻'],
            ['love', '(✿ ♥‿♥) '],
            ['bill', '[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]'],
            ['zoidberg', '(\\/)(Ö,,,,Ö)(\\/) '],
            ['yay', '\\(^-^)/'],
            ['why', '(ノಠ益ಠ)ノ彡'],
            ['sob', '(╥﹏╥)'],
            ['tables', '┻━┻︵  \\(°□°)/ ︵ ┻━┻ '],
            ['finger', '(ಠ_ಠ)┌∩┐'],
            ['thicc', '༼ つ ◕_◕ ༽つ '],
            ['hug', '(っ◕‿◕)っ'],
            ['smooth', '(づ ￣ ³￣)づ ⓈⓂⓄⓄⓉⒽ'],
            ['stroll', 'ᕕ( ᐛ )ᕗ'],
            ['kirby', '(つ -‘ _ ‘- )つ'],
            ['strong', 'ᕦ(ò_óˇ)ᕤ'],
            ['ulenny', '( ͜。 ͡ʖ ͜。)']
        ]);
		if (msg.author.id !== this.client.user.id) return;
        let eMessage = msg.content;
        for (const [key, value] of this.client.emotes.entries()) {
            if (eMessage.includes(`.${key}`)) eMessage = replaceAll(eMessage, `.${key}`, value);
        }
        if (eMessage !== msg.content) msg.edit(Discord.Util.escapeMarkdown(eMessage));
    }



};
const replaceAll = (msg, target, replacement) => {
    return msg.split(target).join(replacement);
};