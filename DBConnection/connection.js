const mongoose = require("mongoose");
const DB_NAME = "markovate";
const MONGO_URI = `mongodb+srv://abhinavdaspro:admin123@freecluster01.vyqv9xf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const DbConnection = () => {

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("----MongoDB connected----");
    }).catch(err => {
        console.log("---- DB Connection Failed-----")
    });
}


module.exports = DbConnection