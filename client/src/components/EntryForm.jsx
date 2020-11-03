import React from 'react';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      entryName: '',
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
    console.log('User object from front-end', user);
    this.props.addUser(user);
    this.setState({
      userName: '',
      entryName: ''
    });
  }

  render() {
    return (
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
    );
  }
}

export default EntryForm;