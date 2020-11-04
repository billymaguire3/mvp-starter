import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import EntryForm from './components/EntryForm.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import EntriesList from './components/EntriesList.jsx';
import SitchChat from './components/SitchChat.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      weekNumber: 9,
      schedule: [],
    };
    this.getUsers = this.getUsers.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.getSchedule(this.state.weekNumber);
  }

  getUsers() {
    axios.get('/users')
      .then((response) => this.setState({ users: response.data }))
      .catch((err) => console.log(err));
  }

  addUser(user) {
    axios.post('/users', user)
      .then((response) => {
        this.getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSchedule(weekNum) {
    axios.get(`/schedules/${weekNum}`)
      .then((response) => this.setState({ schedule: response.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { weekNumber, schedule, users } = this.state;
    return (
      <div>
        <header className="header-container">
          <Header />
          <Navbar />
        </header>
        <div className="grid-wrapper">
          <EntryForm
            weekNumber={weekNumber}
            addUser={this.addUser}
            schedule={this.state.schedule}
          />
          <Leaderboard
            className="leaderboard"
            users={users}
          />
        </div>
        <EntriesList
          users={users}
        />
        <SitchChat />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));