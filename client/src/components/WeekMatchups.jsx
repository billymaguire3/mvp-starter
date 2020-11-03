import React from 'react';

class WeekMatchups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekNumberValue: this.props.weekNumber,
      homeTeamSelected: false,
      awayTeamSelected: false,
      picks: []
      // isChecked: false,
    };
    this.handlePickChange = this.handlePickChange.bind(this);
    this.savePick = this.savePick.bind(this);
  }

  savePick(team) {
    this.setState({picks: [...this.state.picks, team]});
  }

  handlePickChange(event) {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  }

  render() {
    const { schedule } = this.props;
    return (
      <div>
        <div>
          <select>
            <option value="week 9" onChange={this.handleChange}>Week {this.state.weekNumberValue}</option>
          </select>
        </div>
        <div className="table-wrapper">
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
                            onClick={this.savePick(matchup.homeTeam)}
                            onChange={this.handlePickChange}/>
                        </td>
                        <td className="away-team">
                          <div>{matchup.awayTeam}</div>
                          <input
                            name="awayTeamSelected"
                            type="checkbox"
                            onClick={this.savePick(matchup.homeTeam)}
                            onChange={this.handlePickChange}/>
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

    );
  }
}

export default WeekMatchups;