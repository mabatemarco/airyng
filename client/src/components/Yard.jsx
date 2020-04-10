import React, { Component } from 'react';
import '../css/Yard.css';
import { Link, withRouter } from 'react-router-dom'
import { oneSpace, editSchedule } from '../services/api-helper.js';
import yardClip from '../images/yardclip.jpg';
import user from '../images/user.png'

class Yard extends Component {
  state = {
    space: {},
    address: '',
    images: [],
    bookings: []
  }

  componentDidMount = async () => {
    const space = await oneSpace(this.props.yardId)
    const sortedDates = space.schedules.sort((a, b) => new Date(a.date) - new Date(b.date))
    this.sortBookings(sortedDates)
    const address = space.street.split(' ').join('+')
    this.setState({
      space,
      images: space.pics,
      address,
    })
  }

  sortBookings = (schedules) => {
    const bookings = schedules.filter(time => {
      return !time.user_id
    });
    this.setState({
      bookings
    })
  }

  newMain = (e) => {
    const newMain = e.target.src;
    let images = this.state.images.filter(image => {
      return image.img_url !== newMain
    })
    images.unshift({ img_url: newMain });
    this.setState({
      images
    })
  }

  bookYard = async (e) => {
    e.preventDefault();
    const booked = await editSchedule(this.state.space.id, e.target.value, this.props.currentUser.id)
    const schedules = this.state.bookings
    const bookings = schedules.filter(time => (
      booked.id!==time.id
    ))
    this.setState({
      bookings
    })
    alert('Your booking had been completed.  Manage your bookings from your profile page.')
  }

  imageLayout = () => {
    if (this.state.images.length === 1) {
      return (
        <div className="yard-imgs">
          <div className="main-img">
            <img src={this.state.images[0].img_url} alt="" />
          </div>
        </div>
      )
    } else if (this.state.images.length === 2) {
      return (
        <div className="yard-imgs">
          <div className="main-img">
            <img src={this.state.images[0].img_url} alt="" />
          </div>
          <div className="other-imgs">
            <img height='100%' width='100%' onClick={this.newMain} src={this.state.images[1].img_url} alt="" />
          </div>
        </div>
      )
    } else if (this.state.images.length === 3) {
      return (
        <div className="yard-imgs">
          <div className="main-img">
            <img src={this.state.images[0].img_url} alt="" />
          </div>
          <div className="other-imgs">
            {this.state.images.slice(1).map(image => (
              <img height='50%' width='100%' onClick={this.newMain} src={image.img_url} alt="" />
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className="yard-imgs">
          <div className="main-img">
            <img src={this.state.images[0].img_url} alt="" />
          </div>
          <div className="other-imgs">
            {this.state.images.slice(1).map(image => (
              <img height='50%' width='50%' onClick={this.newMain} src={image.img_url} alt="" />
            ))}
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <>
        {this.state.images.length > 0 &&
          this.imageLayout()}
        <div className='yard'>

          <div className="flex">
            <div className="description">
              <div className="yard-title">
                <h2>{this.state.space.name} - <small>{this.state.space.street}, {this.state.space.city}, {this.state.space.state} {this.state.space.zip}</small></h2>
                {this.state.space.user &&
                  <div className="user-info">
                    {this.state.space.user.img_url ?
                      <img src={this.state.space.user.img_url} alt="" /> :
                      <img src={user} alt="" />
                    }
                    <p onClick={() => { this.props.history.push(`/profile/${this.state.space.user.id}`) }}>{this.state.space.user.username}</p>
                  </div>}
              </div>
              <p>{this.state.space.description}</p>
            </div>
            <div className="yard-schedules">
              <iframe className='yard-map' src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDqfjjFh8hQa3iUyBesMdEkwbMgbFeeJeo&q=${this.state.address},${this.state.space.city}+${this.state.space.state}`}></iframe>
              <div className="yard-bookings">
                <h2>Availability</h2>
                {this.state.bookings.length === 0 ?
                  <p id='no-times' className='yard-times'>No available times</p> :
                  this.state.bookings.map(time => (
                    <div key={time.id} className="yard-times">
                      <p>{time.date}: {time.start_time}-{time.end_time} &mdash; ${time.rate}</p>
                      {this.props.currentUser &&
                        <button value={time.id} onClick={this.bookYard}>Book yard</button>}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default withRouter(Yard)
