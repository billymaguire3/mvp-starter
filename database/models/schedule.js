const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: Number,
  teamName: String,
  abbreviation: String,
  conference: String,
  division: String,
});

const scheduleSchema = new mongoose.Schema({

});

const Teams = mongoose.model('Teams', teamSchema);

module.exports = {
  Teams,
}