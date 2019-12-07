import React, { Component } from 'react';
import '../css/Profile.css';
import {getUser} from '../services/api-helper.js'

export default class Profile extends Component {
  state = {
    user: {
      username: '',
      name:'',
      email: '',
      img_url: '',
      about_me:''
    },
    spaces: [],
    schedules:[]
  }

  componentDidMount = async () => {
    const user = await getUser(this.props.profileId)
    const { username, email, img_url, about_me, name, spaces, schedules } = user
    this.setState({
      user: {
        username,
        name,
        email,
        img_url,
        about_me
      },
      spaces,
      schedules
    })
  }

  render() {
    return (
      <div className='profile'>
        
      </div>
    )
  }
}
