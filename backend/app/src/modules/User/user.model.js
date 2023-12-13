const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    email:      { type: String, require: true, unique: true },
    name:       { type: String, require: true },
    surname:    { type: String, require: true },
    password:   { type: String, require: true },
    roles:      { type: Array, require: false, default: ["USER"] },
    idCompany:  { type: String, require: false },
})

module.exports = mongoose.model('User', UserSchema);