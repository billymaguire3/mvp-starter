import React from 'react';

class EntriesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedUserName: '',
      selectedPicksEntry: '',
    };
    this.generateUniqueUsersArray = this.generateUniqueUsersArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generatePicksArray = this.generatePicksArray.bind(this);
    this.handleEntryClick = this.handleEntryClick.bind(this);
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

  generatePicksArray(pickString) {
    return pickString.split(',');
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      selectedUserName: value
    });
  }

  handleEntryClick(event) {
    this.setState({
      selectedPicksEntry: event.target.innerText
    });
  }

  render() {
    const { users } = this.props;
    const { selectedUserName, selectedPicksEntry } = this.state;
    const uniqueUsers = this.generateUniqueUsersArray(users);
    const selectedEntryName = users.filter((user) => user.entryName === selectedPicksEntry);
    return (
      <div>
        <h3>Sitch Viewer</h3>
        <form>
          <label>
            select a user to view their picks
            <select value={selectedUserName} onChange={this.handleChange}>{
              uniqueUsers.map((user) => <option name={selectedUserName} key={user} value={user}>{user}</option>)
            }</select>
          </label>
        </form>
        <div>
          <ul>{
            users.filter((user) => user.userName === selectedUserName).map((element) => {
              return (
                <li
                  value={element.entryName}
                  onClick={this.handleEntryClick}
                  key={element._id}
                >{element.entryName}</li>
              );
            })
          }</ul>
        </div>
        <div>
          <ul>{
            selectedPicksEntry.length > 0 ? this.generatePicksArray(selectedEntryName[0].picks).map((pick, i) => <li key={i}>{pick}</li>) : <div></div>
          }</ul>
        </div>
      </div>
    );
  }
}

export default EntriesList;