const Teams = require('../models/teams');

const selectAllTeams = (callback) => {
  Teams.find({}, (err, teams) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, teams);
    }
  });
};

module.exports = {
  selectAllTeams,
}