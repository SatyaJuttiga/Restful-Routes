var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);
var User = module.exports = mongoose.model('User', UserSchema);
/*
User.create({
    username:'satya',
    password:'123'
});
*/