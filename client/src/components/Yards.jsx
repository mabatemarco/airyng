import React, { Component } from 'react';
import '../css/Yards.css';
import { Link } from 'react-router-dom';
import clip from '../images/yardclip.jpg';
import { allSpaces } from '../services/api-helper.js'

export default class Yards extends Component {
  state = {
    spaces: []
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

  render() {
    return (
      <div>
        <h1>Find the yard for you</h1>
        <div className="spaces">
          {this.state.spaces.map(space => {
            const address = space.street.split(' ').join('+')
            return (
              <div className="space" key={space.id}>
                
                {space.pics.length>0 &&
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
          })}
        </div>
      </div>
    )
  }
}
