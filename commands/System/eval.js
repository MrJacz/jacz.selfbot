const {
	Command
} = require('klasa');
const {
	inspect
} = require('util');
const hastebin = require('hastebin-gen');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'eval',
			enabled: true,
			runIn: ['text', 'dm', 'group'],
			cooldown: 2,
			aliases: ["ev"],
			permLevel: 0,
			botPerms: ["SEND_MESSAGES"],
			requiredSettings: [],
			description: 'Evaluates arbitrary Javascript.',
			usage: '<expression:str>',
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg, [code]) {
		let client = msg.client;
		try {
		let evaled = eval(code);
		if (evaled instanceof Promise) evaled = await evaled;
		if (typeof evaled !== 'string') evaled = inspect(evaled, {
			depth: 0
		});
    const emoji = ":regional_indicator_e: :regional_indicator_v: :regional_indicator_a: :regional_indicator_l:";
		const evaledcode = this.client.methods.util.clean(evaled);
		if (evaled.length > 1999) {
			hastebin(evaledcode, "js").then(r => {
        msg.send(`\`Input:\`\n${this.client.methods.util.codeBlock('js', code)}\n\`Output:\` **Evaled code was over 2000 letters Here yo go **${r}`);
			}).catch(console.error);
		} else {
      msg.send(`\`Input:\`\n${this.client.methods.util.codeBlock('js', code)}\n \`Output:\` \`\`\`js\n${evaledcode}\`\`\``);
		}
		} catch(err) {
      msg.send(`\`Input:\`\n${this.client.methods.util.codeBlock('js', code)}\`ERROR\`\n${this.client.methods.util.codeBlock('js', this.client.methods.util.clean(err))}`);
			if (err.stack) this.client.emit('error', err.stack);
		}

	}
};