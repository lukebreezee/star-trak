const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    teamUsername: String
});

const User = new mongoose.model('User', userSchema);

module.exports = User;