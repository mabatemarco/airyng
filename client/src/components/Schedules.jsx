import React, { Component } from 'react';
import '../css/Schedules.css';
import { oneSpace, createSchedule, deleteSchedule } from '../services/api-helper.js'

export default class Schedules extends Component {
  state = {
    space: {},
    images: [],
    booked: [],
    notBooked: [],
    edit: '',
    addBooking: false,
    schedule: {
      date: '',
      start_time: '',
      end_time: '',
      rate: 0
    }
  }

  componentDidMount = async () => {
    const space = await oneSpace(parseInt(this.props.spaceId))
    const sortedDates = this.dateSort(space.schedules)
    const booked = sortedDates.filter(schedule => (
      schedule.user_id
    ))
    const notBooked = sortedDates.filter(schedule => (
      !schedule.user_id
    ))
    this.setState({
      booked,
      notBooked,
    })
    this.setState({
      space,
      images: space.pics,
    })
  }

  dateSort = (schedules) => {
    const sortedDates = schedules.sort((a, b) => new Date(a.date) - new Date(b.date))
    return sortedDates
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      schedule: {
        ...prevState.schedule,
        [name]: value
      }
    }))
  }

  newSchedule = async (e) => {
    e.preventDefault();
    const newSchedule = await createSchedule(this.props.spaceId, this.state.schedule)
    const schedules = this.state.notBooked;
    schedules.push(newSchedule)
    const notBooked=this.dateSort(schedules)
    this.setState({
      notBooked
    })
  }

  removeSchedule = async (e) => {
    e.preventDefault();
    const removed = await deleteSchedule(this.props.spaceId, e.target.value);
    const times=this.state.notBooked
    const notBooked = times.filter(time => {
      return removed.id !== time.id
    })
    this.setState({
      notBooked
    })
  }



  render() {
    return (
      <div className='bookings'>
        <div className="schedules-space">
          <h2>{this.state.space.name}</h2>
          {this.state.images.length > 0 &&
            <img src={this.state.images[0].img_url} alt="" />}
        </div>
        <div className="schedules-schedules">
          <div className="schedules-booked">
            <h2>Upcoming Bookings</h2>
            {this.state.booked.length === 0 ?
              <p>No upcoming bookings</p> :
              <p>dsaf</p>}
          </div>
          <div className="schedules-notbooked">
            <h2>Available Times</h2>
            {this.state.notBooked.length === 0 ?
              <p>No available times</p> :
              this.state.notBooked.map(time => (
                <div key={time.id} className="not-booked">
                  <p>{time.date}: {time.start_time}-{time.end_time} &mdash; ${time.rate}</p>
                  <button value={time.id} onClick={this.removeSchedule}>Delete available time</button>
                </div>
              ))
            }
            {this.state.addBooking ?
              <div className="new-booking">
                <div className="pair">
                  <label htmlFor="date">Date</label>
                  <input type="date" name='date' onChange={this.handleChange} value={this.state.schedule.date} />
                </div>
                <div className="pair">
                  <label htmlFor="start_time">Start Time</label>
                  <input type="time" name='start_time' onChange={this.handleChange} value={this.state.schedule.start_time} />
                </div>
                <div className="pair">
                  <label htmlFor="end_time">End Time</label>
                  <input type="time" name='end_time' onChange={this.handleChange} value={this.state.schedule.end_time} />
                </div>
                <div className="pair">
                  <label htmlFor="rate">Rate</label>
                  <input type="number" name='rate' onChange={this.handleChange} value={this.state.schedule.rate} />
                </div>
                <button onClick={this.newSchedule}>Save</button>
              </div> :
              <button id='add-booking' onClick={(e) => { e.preventDefault(); this.setState({ addBooking: true }) }}>Add available time</button>}
          </div>
        </div>
      </div>
    )
  }
}
