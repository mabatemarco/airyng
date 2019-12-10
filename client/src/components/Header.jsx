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
        {this.props.currentUser ?
          <Link to='/yards'>
            <img src={yardIcon} alt="grillin" />
          </Link> :
          <Link to='/'>
            <img src={yardIcon} alt="grillin" />
          </Link>}

        <div className="links">
          <Link className='underline' to='/yards'>
            Browse Yards
            </Link>
          {this.props.currentUser &&
            <Link className='underline' to='/rent/new'>
              Rent Your Yard
        </Link>}
          {!this.props.currentUser ?
            <p className='underline' onClick={this.props.loginToggle}>
              Login/Register
            </p>
            :
            <div onClick={() => { this.hamToggle(); this.menuToggle() }} className={this.state.hamClass}>
              <div></div>
            </div>
          }
          {this.state.menu &&
            <div className="ham-menu">
              <Link onClick={() => { this.hamToggle(); this.menuToggle() }} to={`/profile/${this.props.currentUser.id}`}>
                Profile
              </Link>
              <p onClick={() => { this.props.logout(); this.hamToggle(); this.menuToggle() }}>
                Log Out
              </p>
            </div>}
        </div>
      </header>
    )
  }
}
