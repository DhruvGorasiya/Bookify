const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    id : {type: String, unique: true},
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;