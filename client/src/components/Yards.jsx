import React, { Component } from 'react';
import '../css/Yards.css';
import { Link } from 'react-router-dom';
import clip from '../images/yardclip.jpg';
import { allSpaces } from '../services/api-helper.js'

export default class Yards extends Component {
  state = {
    spaces: [],
    search: {
      city: '',
      date: ''
    }
  }

  componentDidMount = () => {
    this.getSpaces()
  }

  getSpaces = async () => {
    const spaces = await allSpaces()
    this.setState({
      spaces
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      search: {
        ...prevState.search,
        [name]: value
      }
    }))
  }

  search = async (e) => {
    e.preventDefault();
    let allTheSpaces = await allSpaces()
    let spaces = []
    if (this.state.search.date) {
      spaces = allTheSpaces.filter(space => {
        for (let i = 0; i < space.schedules.length; i++) {
          if (space.schedules[i].date === this.state.search.date) {
            if (this.state.search.city) {
              if (space.city === this.state.search.city) {
                return space
              }
            } else {
              return space
            }
          }
        }
      })
    }
    if (this.state.search.city) {
      spaces = allTheSpaces.filter(space => (
        space.city === this.state.search.city
      ))
    }
    this.setState({
      spaces
    })
  }

  render() {
    return (
      <div>
        <h1>Find the yard for you</h1>
        <div className="yards-search">
          <label htmlFor='city'>City</label>
          <input name='city' type='text' value={this.state.search.city} onChange={this.handleChange} />
          <label htmlFor='date'>Date</label>
          <input name='date' type='date' value={this.state.search.date} onChange={this.handleChange} />
          <button onClick={this.search}>Search</button>
        </div>
        <div className="spaces">
          {this.state.spaces.length===0 ?
            <h2 className='no-spaces'>No Spaces That Meet Your Criterea</h2> :
            <>
              {
                this.state.spaces.map(space => {
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
                        <Link to={`/yard/${space.id}`}>
                          <button>Availability and Details</button>
                        </Link>
                      </div>
                      <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDqfjjFh8hQa3iUyBesMdEkwbMgbFeeJeo&q=${address},${space.city}+${space.state}`}></iframe>
                    </div>)
                })
              }</>}
        </div>
      </div>
    )
  }
}
