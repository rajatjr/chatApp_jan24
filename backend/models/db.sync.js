const Users = require("./UserModel");
const chat = require("./chatmodal");

(async () => {
    await Users.sync();
    await chat.sync()
})()
