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
              <th classname="date-time">Date/Time</th>
              <th classname="location">Location</th>
              <th classname="home-team">Home Team</th>
              <th classname="away-team">Away Team</th>
              <th classname="result">Result</th>
              <th classname="spread">Spread</th>
              <th classname="pick">Pick</th>
            </tr>
          </thead>
        </table>
        <ul>
          {
            schedule.map((matchup) => {
              return (
                <li>

                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default WeekMatchups;