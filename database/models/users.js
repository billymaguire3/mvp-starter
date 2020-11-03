const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userName: String,
  entryName: String,
});

const User = mongoose.model('Users', usersSchema);
module.exports = User;