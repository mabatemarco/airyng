import React from 'react';
import '../css/Login.css';

export default class Login extends React.Component {
  state = {
    register: false,
  }

  registerToggle = () => {
    this.setState(prevState => ({
      register: !prevState.register
    }))
  }

  render() {
    return (
      <div className='modal'>
        <div className="top">
          <span onClick={this.props.loginToggle}>X</span>
        </div>

        <form>
          <div className="pair">
            <label htmlFor='username'>Username</label>
            <input name='username' type='text' value={this.props.userData.username} onChange={this.props.handleChange} />
          </div>

          <div className="pair">
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' value={this.props.userData.password} onChange={this.props.handleChange} />
          </div>

          {!this.state.register &&
            <>
              <button onClick={this.props.loginSubmit}>Log In</button>
              <p onClick={this.registerToggle}>Not a member?  Join Now</p>
            </>
          }

          {this.state.register &&
            <>
              <div className="pair">
                <label htmlFor='name'>Full Name</label>
                <input name='name' type='text' value={this.props.userData.name} onChange={this.props.handleChange} />
              </div>
              <div className="pair">
                <label htmlFor='email'>Email Address</label>
                <input name='email' type='email' value={this.props.userData.email} onChange={this.props.handleChange} />
              </div>
              <button onClick={this.props.registerSubmit}>Register</button>
            </>
          }
        </form>
      </div>
    )
  }
}

