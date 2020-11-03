import React from 'react';

class WeekMatchups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekNumberValue: this.props.weekNumber
    };
  }
  render() {
    const { schedule } = this.props;
    return (
      <div>
        <select value={this.state.weekNumberValue} onChange={this.handleChange}>
          <option value="week 9">Week {this.state.weekNumberValue}</option>
        </select>
        <table className="main-table">
          <thead id="table-header">
            <tr id="table-header-row">
              <th classname="date-time">Day/Month/Time</th>
              <th classname="location">Location</th>
              <th classname="home-team">Home Team</th>
              <th classname="away-team">Away Team</th>
              <th classname="result">Result</th>
              <th classname="spread">Spread</th>
              {/* <th classname="pick">Pick</th> */}
            </tr>
          </thead>
          <tbody>
            {
              schedule.map((matchup) => {
                const dateTime = `${matchup.date.slice(0, 5)} ${matchup.date.slice(-4)}`;
                return (
                  <tr>
                    <td class="date-time">
                      <div>{dateTime}</div>
                    </td>
                    <td className="location">
                      <div>{matchup.location}</div>
                    </td>
                    <td className="home-team">
                      <div>{matchup.homeTeam}</div>
                      <input name="homeTeamSelected" type="checkbox" />
                    </td>
                    <td className="away-team">
                      <div>{matchup.awayTeam}</div>
                      <input name="awayTeamSelected" type="checkbox" />
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
    );
  }
}

export default WeekMatchups;