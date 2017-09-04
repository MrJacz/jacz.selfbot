const {
    Command
} = require('klasa');
const Discord = require("discord.js");
let statuses = {
    "online": "online",
    "on": "online",
    "invisible": "invisible",
    "offline": "invisible",
    "off": "invisible",
    "invis": "invisible",
    "i": "invisible",
    "dnd": "dnd",
    "idle": "idle"
};
module.exports = class StatusCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'status',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 10,
            aliases: ["s"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Changes the Status of the user',
            usage: '<status:string>',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [status]) {
        if (!status) return msg.edit("Ya need to supply me with a status").then(m => m.delete({
            timeout: 15000
        }));
        let statuss = statuses[status.toLowerCase()];
        if (!statuss) {
            return msg.edit(`Ya flop you provided a invaild status`).then(m => m.delete({
                timeout: 15000
            }));
        }
        if (statuss === "on") statuss = "online";
        if (statuss === "off") statuss = "invisible";
        if (statuss === "i") statuss = "invisible";
        if (statuss === "offline") statuss = "invisible";
        msg.client.user.setStatus(statuss).then(u => {
            msg.edit(`Status changed to ${statuss}.`).then(m => m.delete({
                timeout: 10000
            }));
        }).catch(e => {
            msg.edit(`**Bad,** error while trying to changing status for ${msg.client.user.tag} to: ${statuss}.\n\`\`\`${e}\`\`\``).then(m => m.delete({
                timeout: 10000
            }));
        });
    }
};