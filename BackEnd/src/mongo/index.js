const mongoose = require("mongoose");
const LOGIN = "MongoLearn";
const PASSWORD = "s6yKWs8bmflz3y1N";
const URL = `mongodb+srv://${LOGIN}:${PASSWORD}@cluster0.tcgkuyk.mongodb.net/?retryWrites=true&w=majority`;

function mongo() {
  mongoose.connect(URL).then(() => console.log("connected tp DB"));
}

module.exports = mongo;
