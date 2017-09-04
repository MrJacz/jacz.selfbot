const { Client } = require("klasa");
const auth = require("./config.json");

class JaczClient extends Client {
    constructor(options) {
        super(options);
}
}

const client = new JaczClient({
    clientOptions: {
        fetchAllMembers: true,
    },
    prefix: auth.prefix,
    cmdPrompt: true,
    cmdEditing: true,
    ownerID: auth.id,
    ignoreSelf: false,
    ignoreBots: true
})
client.config = Object.assign(client.config, require("./config.json"));
client.login(auth.token);