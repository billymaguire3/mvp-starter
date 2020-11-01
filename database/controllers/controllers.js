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

module.exports = {
  selectAllSchedules,
  selectScheduleByWeekNumber,
  selectAllUsers,
};
