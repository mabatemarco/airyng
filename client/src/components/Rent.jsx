import React, { Component } from 'react';
import '../css/Rent.css';
import {createSpace} from '../services/api-helper.js'


export default class Rent extends Component {
  state = {
    space: {
      name: '',
      description: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      img_url:''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      space: {
        ...prevState.space,
        [name]:value
      }
    }))
  }

  spaceSubmit = async () => {
    
  }


  render() {
    return (
      <div>
        <form>
        <div className="pair">
            <label htmlFor='name'>Title</label>
            <input name='name' type='text' value={this.state.space.name} onChange={this.handleChange} />
          </div>
          <div className="pair">
            <label htmlFor='description'>Sescription</label>
            <input name='description' type='text' value={this.state.space.description} onChange={this.handleChange} />
          </div>
          <div className="pair">
            <label htmlFor='street'>Street Address</label>
            <input name='street' type='text' value={this.state.space.street} onChange={this.handleChange} />
          </div>
          <div className="pair">
            <label htmlFor='city'>City</label>
            <input name='city' type='text' value={this.state.space.city} onChange={this.handleChange} />
          </div>
          <div className="pair">
            <label htmlFor='state'>State</label>
            <input name='state' type='text' value={this.state.space.state} onChange={this.handleChange} />
          </div>
          <div className="pair">
            <label htmlFor='zip'>Zip</label>
            <input name='zip' type='text' value={this.state.space.zip} onChange={this.handleChange} />
          </div>
          <div className="pair">
            <label htmlFor='img_url'>Image URL</label>
            <input name='img_url' type='text' value={this.state.space.img_url} onChange={this.handleChange} />
          </div>

          <button onClick={this.spaceSubmit}>Rent my Yard!</button>
        </form>
      </div>
    )
  }
}
