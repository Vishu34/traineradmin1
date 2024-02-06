const dbConfig = require("../config/config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.trainers = require("./trainer")(mongoose);
db.students = require("./student")(mongoose);
db.categories = require("./categories")(mongoose);

module.exports = db;