const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userName: String,
  entryName: String,
  picks: String,
});

const User = mongoose.model('Users', usersSchema);
module.exports = User;