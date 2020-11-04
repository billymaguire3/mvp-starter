const Schedules = require('../models/schedules');
const Users = require('../models/users');

const selectAllSchedules = () => {
  return Schedules.find({});
};

const selectScheduleByWeekNumber = (weekNumberValue) => {
  return Schedules.find({}).where('weekNumber').equals(weekNumberValue).exec();
};

const selectAllUsers = () => {
  return Users.find({});
};

const addUserEntry = (userEntry, callback) => {
  const newUser = new Users(userEntry);
  return newUser.save((err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
      console.log(`Successfully inserted ${userEntry.userName}'s pick entry`);
    }
  });
};

module.exports = {
  selectAllSchedules,
  selectScheduleByWeekNumber,
  selectAllUsers,
  addUserEntry,
};
