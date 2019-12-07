import React from 'react';
import '../css/Header.css';
import yardIcon from '../images/yard.jpeg';
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  state = {
    hamClass: 'ham-icon',
    menu: false,
  }

  hamToggle = () => {
    if (this.state.hamClass === 'ham-icon') {
      this.setState({
        hamClass: 'ham-icon clicked-ham'
      })
    }
    else {
      this.setState({
        hamClass: 'ham-icon'
      })
    }
  }

  menuToggle = () => {
    this.setState(prevState => ({
      menu: !prevState.menu
    }))
  }

  render() {
    return (
      <header>
        <Link to='/'>
          <img src={yardIcon} alt="grillin" />
        </Link>

        <div className="links">
          <Link to='/'>
            Find Yards
        </Link>
          <Link to='/rent/new'>
            Rent Your Yard
        </Link>
          {!this.props.currentUser ?
            <p onClick={this.props.loginToggle}>
              Login/Register
            </p>
            :
            <div onClick={() => { this.hamToggle(); this.menuToggle() }} className={this.state.hamClass}>
              <div></div>
            </div>
          }
          {this.state.menu &&
            <div className="ham-menu">
              <Link to={`/profile/${this.props.currentUser.id}`}>
                Profile
              </Link>
            <p onClick={() => { this.props.logout(); this.menuToggle() }}>
                Log Out
              </p>
            </div>}
        </div>
      </header>
    )
  }
}
