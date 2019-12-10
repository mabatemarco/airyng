import React from 'react';
import './css/App.css';
import { Link, Route, withRouter } from 'react-router-dom'
import { verifyUser, getZip, registerUser, loginUser, allSpaces } from './services/api-helper.js'
import Header from './components/Header'
import Front from './components/Front'
import Footer from './components/Footer'
import Login from './components/Login'
import Yards from './components/Yards'
import Rent from './components/Rent'
import Yard from './components/Yard'
import Profile from './components/Profile'
import Schedules from './components/Schedules'

class App extends React.Component {
  state = {
    currentUser: null,
    currentZip: null,
    login: false,
    falseLogin: false,
    userData: {
      username: '',
      password: '',
      email: '',
      name: ''
    },
    spaces: []
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({
        currentUser
      })
    }
    // let currentZip = await getZip();
    // currentZip = parseInt(currentZip)
    // this.setState({
    //   currentZip
    // })
  }


  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken')
    this.props.history.push('/')
  }

  loginToggle = () => {
    this.setState(prevState => ({
      login: !prevState.login
    }))
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }))
  }

  loginSubmit = async (e) => {
    e.preventDefault()
    const loginData = {
      username: this.state.userData.username,
      password: this.state.userData.password
    }
    const currentUser = await loginUser(loginData);
    if (currentUser.error) {
      this.setState({
        falseLogin: true
      })
    } else {
      this.setState({
        currentUser,
        login: false
      })
      this.props.history.push('/yards')
    }
  }

  registerSubmit = async (e) => {
    e.preventDefault()
    const currentUser = await registerUser(this.state.userData);
    this.setState({
      currentUser,
      login: false
    })
    this.props.history.push('/yards')
  }

  render() {
    return (
      <div className="app">
        <Header
          currentUser={this.state.currentUser}
          logout={this.handleLogout}
          loginToggle={this.loginToggle}
        />



        <main>
          {this.state.login &&
            <Login
              userData={this.state.userData}
              handleChange={this.handleChange}
              loginToggle={this.loginToggle}
              loginSubmit={this.loginSubmit}
              registerSubmit={this.registerSubmit}
            />}
          {!this.state.currentUser &&
            <Route exact path='/' render={() => (
              <Front />)} />}

          <Route exact path='/yards' render={() => (
            <Yards
              spaces={this.state.spaces}
            />)} />

          <Route path='/yard/:id' render={(props) => (
            <Yard
              yardId={props.match.params.id}
              currentUser={this.state.currentUser}
            />
          )} />

          {this.state.currentUser &&
            <>

              <Route path='/rent/:id' render={(props) => (
                <Rent
                  yardId={props.match.params.id}
                  currentUser={this.state.currentUser}
                  history={this.props.history}
                />
              )} />


              <Route path='/profile/:id' render={(props) => (
                <Profile
                  currentUser={this.state.currentUser}
                  profileId={props.match.params.id}
                  logout={this.handleLogout}
                />
              )} />

              <Route path='/schedules/:id' render={(props) => (
                <Schedules
                  currentUser={this.state.currentUser}
                  spaceId={props.match.params.id}
                />
              )} />

            </>}
        </main>




        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
