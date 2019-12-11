import React, { Component } from 'react';
import '../css/Profile.css';
import { getUser, editUser, deleteUser } from '../services/api-helper.js';
import user from '../images/user.png';
import clip from '../images/yardclip.jpg';
import { Link } from 'react-router-dom'

export default class Profile extends Component {
  state = {
    user: {
      username: '',
      name: '',
      email: '',
      img_url: '',
      about_me: ''
    },
    spaces: [],
    schedules: [],
    edit: false,
    id: ''
  }

  componentDidMount = async () => {
    const user = await getUser(this.props.profileId)
    const dates = user.schedules.filter(time => (
      new Date(time.date)>=new Date()
    ))
    const schedules = dates.sort((a, b) => new Date(a.date) - new Date(b.date))
    const { id, username, email, img_url, about_me, name, spaces } = user
    this.setState({
      user: {
        username,
        name,
        email,
        img_url,
        about_me
      },
      id,
      spaces,
      schedules,
      edit: false
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }))
  }

  editToggle = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      edit: !prevState.edit
    }))
  }

  profileEdit = (e) => {
    e.preventDefault();
    editUser(parseInt(this.state.id), this.state.user);
    this.setState({
      edit: false
    })
  }

  profileDelete = (e) => {
    e.preventDefault();
    deleteUser(this.state.user.id)
    localStorage.removeItem('authToken')
    this.props.logout()
  }

  render() {
    return (
      <div className='profile'>
        <div className="user-info">
          <div className="profile-img">
            {this.state.user.img_url ?
              <img src={this.state.user.img_url} alt="" /> :
              <img src={user} alt="" />}
            {this.state.edit &&
              <input name='img_url' type='img_url' placeholder="Image URL" value={this.state.user.img_url} onChange={this.handleChange} />
            }
          </div>
          <div className="profile-info">
            <div className="titles">
              <h3>Username:</h3>
              <h3>Name:</h3>
              <h3>Email:</h3>
              <h3>About Me:</h3>
            </div>
            <div className="content">
              {this.state.edit ?
                <>
                  <input name='username' type='username' value={this.state.user.username} onChange={this.handleChange} />
                  <input name='name' type='name' value={this.state.user.name} onChange={this.handleChange} />
                  <input name='email' type='email' value={this.state.user.email} onChange={this.handleChange} />
                  <textarea name='about_me' type='about_me' value={this.state.user.about_me} onChange={this.handleChange} />
                </> :
                <>
                  <h3>{this.state.user.username}</h3>
                  <h3>{this.state.user.name}</h3>
                  <h3>{this.state.user.email}</h3>
                  {this.state.user.about_me ?
                    <h3>{this.state.user.about_me}</h3> :
                    <h3>Tell us about yourself!</h3>
                  }
                </>
              }
              {this.props.currentUser.id === this.state.id &&
                <>{
                  this.state.edit ?
                    <button onClick={this.profileEdit}>Save</button>
                    :
                    <>
                      <button onClick={this.editToggle}>Edit Profile</button>
                      <button onClick={this.profileDelete}>Delete Profile</button>
                    </>
                }</>}
            </div>
          </div>
        </div>
        {this.state.spaces.length > 0 &&
          <>
            <h2 className='title'>Yards</h2>
            <div className="spaces">
              {this.state.spaces.map(space => {
                const address = space.street.split(' ').join('+')
                return (
                  <div className="space" key={space.id}>

                    {space.pics.length > 0 &&
                      <div className="space-img">
                        {space.pics[0].img_url ?
                          <img src={space.pics[0].img_url} alt="" /> :
                          <img src={clip} alt="" />}
                      </div>}
                    <div className="info">
                      <h2>{space.name} - <small>{space.city}, {space.state}</small></h2>
                      <div className="blurb">
                        <p>{space.description}</p>
                      </div>
                      {this.props.currentUser.id === this.state.id &&
                        <div className="buttons">
                          <Link to={`/rent/${space.id}`}>
                            <button>Edit Yard</button>
                          </Link>
                          <Link to={`/schedules/${space.id}`}>
                            <button>Bookings and Schedule</button>
                          </Link>
                        </div>}
                    </div>
                    <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDqfjjFh8hQa3iUyBesMdEkwbMgbFeeJeo&q=${address},${space.city}+${space.state}`}></iframe>
                  </div>)
              })}
            </div>
          </>
        }
        {this.state.schedules.length > 0 &&
          <div className="profile-schedules">
            <h2 className='title'>Upcoming Rentals</h2>
          {this.state.schedules.map(time => (
              <Link to={`/yard/${time.space.id}`}>
              <div className="profile-schedule">
                <div className="info">
                  <h2>{time.space.name}</h2>
                  <p><strong>{time.date.substr(6,time.date.length-1)}-{time.date.substr(0,4)}</strong> : {time.start_time}-{time.end_time}</p>
                </div>
                <img src={time.space.pics[0].img_url} alt="" />
                <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDqfjjFh8hQa3iUyBesMdEkwbMgbFeeJeo&q=${time.space.street.split(' ').join('+')},${time.space.city}+${time.space.state}`}></iframe>
              </div>
              </Link>
            ))}
          </div>
        }
      </div>
    )
  }
}