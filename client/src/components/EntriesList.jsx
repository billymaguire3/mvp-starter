import React from 'react';

class EntriesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedUserName: '',
    };
    this.generateUniqueUsersArray = this.generateUniqueUsersArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  generateUniqueUsersArray(allUsers) {
    const unique = [];
    for (let i = 0; i < allUsers.length; i += 1) {
      if (unique.indexOf(allUsers[i].userName) < 0) {
        unique.push(allUsers[i].userName);
      }
    }
    return unique;
  }

  handleChange(event) {
    this.setState({
      selectedUserName: event.target.value
    });
  }

  render() {
    const { users } = this.props;
    const { selectedUserName } = this.state;
    const uniqueUsers = this.generateUniqueUsersArray(users);
    return (
      <div>
        <h3>Sitch Peaks</h3>
        <form>
          <label>
            select a user to view their picks
            <select value={this.state.selectedUserName} onChange={this.handleChange}>{
              uniqueUsers.map((user) => <option key={user} value={user}>{user}</option>)
            }</select>
          </label>
        </form>
        <div>
          <ul>{
            users.filter((user) => user.userName === selectedUserName).map((element) => <li key={element._id}>{element.entryName}</li>)
          }</ul>
        </div>
      </div>
    );
  }
}

export default EntriesList;