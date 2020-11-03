import React from 'react';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.savePick = this.savePick.bind(this);
  }

  savePick(team) {
    this.setState({picks: [...this.state.picks, team]});
  }

  handlePickChange(team, event) {
    this.setState({
      [event.target.name]: event.target.checked,
    });
    this.savePick(team);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
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
  }

  render() {
    const { schedule } = this.props;
    return (
      <div>
        <div>
          <form>
            <label>
              Username:
              <input
                type="text"
                value={this.state.userName}
                name="userName"
                onChange={this.handleChange}
              />
            </label>
            <label>
              Entry Name:
              <input
                type="text"
                value={this.state.entryName}
                name="entryName"
                onChange={this.handleChange}
              />
            </label>
            <button onClick={this.handleSubmit}>Create Entry</button>
          </form>
          <h4>{this.state.currentUser}</h4>
          <h4>{this.state.currentEntry}</h4>
        </div>
        <div>
          <div>
            <select>
              <option value="week 9" onChange={this.handleChange}>Week {this.state.weekNumberValue}</option>
            </select>
          </div>
          <div className="weekMatchups">
            <div className="table-container">
              <table className="main-table">
                <thead id="table-header">
                  <tr id="table-header-row">
                    <th className="date-time">Day/Month/Time</th>
                    <th className="location">Location</th>
                    <th className="home-team">Home Team</th>
                    <th className="away-team">Away Team</th>
                    <th className="result">Result</th>
                    <th className="spread">Spread</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    schedule.map((matchup) => {
                      const dateTime = `${matchup.date.slice(0, 5)} ${matchup.date.slice(-4)}`;
                      return (
                        <tr key={matchup._id}>
                          <td className="date-time">
                            <div>{dateTime}</div>
                          </td>
                          <td className="location">
                            <div>{matchup.location}</div>
                          </td>
                          <td className="home-team">
                            <div>{matchup.homeTeam}</div>
                            <input
                              name="homeTeamSelected"
                              type="checkbox"
                              // onClick={this.savePick(matchup.homeTeam)}
                              onChange={this.handlePickChange.bind(this, matchup.homeTeam)} />
                          </td>
                          <td className="away-team">
                            <div>{matchup.awayTeam}</div>
                            <input
                              name="awayTeamSelected"
                              type="checkbox"
                              // onClick={this.savePick(matchup.homeTeam)}
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
                <button>Submit My Picks</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default EntryForm;