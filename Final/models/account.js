var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
	type: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);