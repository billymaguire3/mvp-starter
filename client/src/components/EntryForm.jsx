import React from 'react';
import weeks from '../WeekNumbers';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      entryName: '',
      picks: [],
      currentEntry: '',
      currentUser: '',
    };
    this.handleWeekChange = this.handleWeekChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.savePick = this.savePick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  savePick(team) {
    this.setState({ picks: [...this.state.picks, team] });
  }

  handlePickChange(team, event) {
    this.setState({
      [event.target.name]: event.target.checked,
    });
    this.savePick(team);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.addUser(user);
    this.setState({
      currentEntry: this.state.entryName,
      currentUser: this.state.userName,
      userName: '',
      entryName: '',
    });
    event.target.reset();
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleWeekChange(event) {
    this.props.handleWeekNumberChange(event);
  }

  render() {
    const { schedule } = this.props;
    const { weekNumber, entryName, userName } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <label className="entry-titles">
              Username
              <input
                className="input-bubble"
                type="text"
                value={userName}
                name="userName"
                onChange={this.handleChange}
              />
            </label>
            <label className="entry-titles">
              Entry Name
              <input
                className="input-bubble"
                type="text"
                value={entryName}
                name="entryName"
                onChange={this.handleChange}
              />
            </label>
            <select value={weekNumber} onChange={this.handleWeekChange} className="input-bubble">
              <option>Select Week</option>{
                weeks.map((week, index) => <option value={week.number} key={index}>Week {week.number}</option>)
              }</select>
          </div>
          <div>
            <div>
            </div>
            <div className="weekMatchups">
              <div className="table-container">
                <table className="main-table">
                  <thead className="table-header">
                    <tr id="table-header-row">
                      <th className="date-time">Day/Month/Time</th>
                      <th className="location">Location</th>
                      <th className="home-team">Home Team</th>
                      <th className="away-team">Away Team</th>
                      <th className="result">Result</th>
                      <th className="spread">Spread</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {
                      schedule.map((matchup) => {
                        const dateTime = `${matchup.date.slice(0, 5)} ${matchup.date.slice(-4)}`;
                        return (
                          <tr className="table-body-row" key={matchup._id}>
                            <td className="date-time">
                              <div>{dateTime}</div>
                            </td>
                            <td className="location">
                              <div>{matchup.location}</div>
                            </td>
                            <td className="home-team">
                              <div>{matchup.homeTeam}</div>
                              <input
                                className="input-bubble"
                                name="homeTeamSelected"
                                type="checkbox"
                                onChange={this.handlePickChange.bind(this, matchup.homeTeam)} />
                            </td>
                            <td className="away-team">
                              <div>{matchup.awayTeam}</div>
                              <input
                                className="input-bubble"
                                name="awayTeamSelected"
                                type="checkbox"
                                onChange={this.handlePickChange.bind(this, matchup.awayTeam)} />
                            </td>
                            <td className="result">
                              <div>{matchup.result}</div>
                            </td>
                            <td className="spread">
                              <div>{matchup.spread}</div>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
                <div id="submit-button">
                  <input id="submit" type="submit" value="Create My Entry" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    );
  }
}

export default EntryForm;
