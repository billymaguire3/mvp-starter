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
      weekNumber: this.props.weekNumber
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
    event.target.reset();
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
            <select className="input-bubble">
              <option value="week 9" onChange={this.handleChange}>Week {weekNumber}</option>
            </select>
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
