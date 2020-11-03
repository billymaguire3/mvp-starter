import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import EntryForm from './components/EntryForm.jsx';
import WeekMatchups from './components/WeekMatchups.jsx';
import Leaderboard from './components/Leaderboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      weekNumber: 9,
      schedule: [],
      // selectedId: 0
    };
    this.getUsers = this.getUsers.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.addUser = this.addUser.bind(this);
    // this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
  }

  // checkboxChangeHandler(id) {
  //   this.setState({
  //     selectedId: id,
  //   });
  // }

  componentDidMount() {
    this.getUsers();
    this.getSchedule(this.state.weekNumber);
  }

  getUsers() {
    axios.get('/users')
      .then((response) => this.setState({users: response.data}))
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
      .then((response) => this.setState({schedule: response.data}))
      .catch((err) => console.log(err));
  }

  render () {
    const { weekNumber, schedule, users } = this.state;
    return (
      <div>
        <header className="header-container">
          <Header />
          <Navbar />
        </header>
        <div className="grid-wrapper">
          <EntryForm
            addUser={this.addUser}
            schedule={this.state.schedule}
          />
          {/* <div className="grid-wrapper">
          <WeekMatchups
            className="weekMatchups"
            weekNumber={weekNumber}
            schedule={schedule}
            // selectedId={this.state.selectedId}
            // onSelect={this.checkboxChangeHandler}
          /> */}
          <Leaderboard
            className="leaderboard"
            users={users}
          />
        </div>
        {/* </div> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));