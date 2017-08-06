const klasa = require("klasa");
const auth = require("./config.json");
const client = new klasa.Client({
    clientOptions: {
        fetchAllMembers: true,
    },
    prefix: "!!",
    cmdPrompt: true,
    cmdEditing: true,
    ownerID: client.user.id,
    ignoreSelf: false
});
client.config = require("./config.json");

client.login(auth.token);