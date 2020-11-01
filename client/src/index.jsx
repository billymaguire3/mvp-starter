import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get('/users')
      .then((response) => this.setState({users: response.data}))
      .catch((err) => console.log(err));
  }

  render () {
    return (<div>
      <h1>PickSitch</h1>
      {/* <List items={this.state.items}/> */}
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));