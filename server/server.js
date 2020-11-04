const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../database/controllers/controllers.js');
const db = require('../database/index.js');

const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

// Get full schedule for all weeks
app.get('/schedules', (req, res) => {
  controllers.selectAllSchedules()
    .then((scheduleData) => res.status(200).send(scheduleData))
    .catch((err) => res.status(400).send());
});

// Get schedules by week number
app.get('/schedules/:weekNumber', (req, res) => {
  const { weekNumber } = req.params;
  controllers.selectScheduleByWeekNumber(weekNumber)
    .then((scheduleData) => res.status(200).send(scheduleData))
    .catch((err) => res.status(400).send());
});

// Get all users
app.get('/users', (req, res) => {
  controllers.selectAllUsers()
    .then((usersData) => res.status(200).send(usersData))
    .catch((err) => res.status(400).send());
});

app.post('/users', (req, res) => {
  const user = req.body;
  controllers.addUserEntry(user)
    .then((response) => {
      res.status(201).send('Successfully added new user');
    })
    .catch((err) => {
      res.status(401).send('Error adding new user');
    });
});

app.listen(port, () => {
  console.log(`PickSitch App listening at http://localhost:${port}`);
});
