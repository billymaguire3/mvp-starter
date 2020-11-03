import React from 'react';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { users } = this.props;
    return (
      <div className="leaderboard-container">
        <h3 className="leader-header">Leaderboard</h3>
        <table className="leader-table">
          <thead>
            <tr className="leaderboard-titles">
              <th className="rank">Rank</th>
              <th className="entry">Entry</th>
              <th className="points">Points</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => {
                return (
                  <tr className="leaderboard-titles" key={user._id}>
                    <td className="rank">
                      <div>{index + 1}</div>
                    </td>
                    <td className="entry">
                      <div>{user.entryName}</div>
                    </td>
                    <td className="points">
                      <div>0</div>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;