const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: String,
  entries: [Object],
});

module.exports = mongoose.model('Users', usersSchema);