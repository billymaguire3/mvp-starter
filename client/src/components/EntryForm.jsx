import React from 'react';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      entryName: '',
      currentEntry: '',
      currentUser: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    return (
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
    );
  }
}

export default EntryForm;