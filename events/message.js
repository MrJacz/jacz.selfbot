const { Event } = require('klasa');

module.exports = class extends Event {

	run(msg) {
		if (this.client.ready) this.client.monitors.run(msg);
		if (msg.author.id !== this.client.user.id) return;
	}

};
