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
			aliases: ['ev'],
			permLevel: 10,
			description: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			usage: '<expression:str>'
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
		const evaledcode = this.client.methods.util.clean(evaled);
		if (evaled.length > 1999) {
			msg.delete()
			hastebin(evaledcode, "js").then(r => {

				msg.send(`\`Input:\`\n${this.client.methods.util.codeBlock('js', code)}\n\`Output:\` **Evaled code was over 2000 letters Here yo go **${r}`).then(m => m.delete({ timeout: 10000 }))
			}).catch(console.error);
		} else {
			msg.delete()
			msg.send(`\`Input:\`\n${this.client.methods.util.codeBlock('js', code)}\n \`Output:\` \`\`\`${evaledcode}\`\`\``).then(m => m.delete({ timeout: 10000})).catch(console.log);
		}
		} catch(err) {
			msg.send(`**ERROR**${this.client.methods.util.codeBlock('js', this.client.methods.util.clean(err))}`).then(m => m.delete({ timeout: 10000 })).catch(console.log);
			if (err.stack) this.client.emit('error', err.stack);
		}

	}
};