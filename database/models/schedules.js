const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  weekNumber: Number,
  date: String,
  location: String,
  homeTeam: String,
  awayTeam: String,
  result: String,
  spread: String,
});

module.exports = mongoose.model('Schedules', scheduleSchema);

// module.exports = {
//   Schedules,
// };
