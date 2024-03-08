const mongoose = require("mongoose");

const mongoosedb = "mongodb://localhost:27017/new_Chatapp"
mongoose.connect(mongoosedb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log('Database Connected Suceesfully')
}).catch((err) => console.log(err))