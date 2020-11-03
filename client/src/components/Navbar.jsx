import React from 'react';
import items from '../MenuItems.js';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({clicked: !this.state.clicked});
  }

  render() {
    return (
      <nav className="nav-container">
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        {
          this.state.clicked ?
            <ul>
              {items.map((item, index) => {
                return (
                  <li className="nav-list" key={index}>
                    <a className="nav-list-entry" href={item.url}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            : <div></div>
        }
      </nav>
    );
  }
}

export default Navbar;