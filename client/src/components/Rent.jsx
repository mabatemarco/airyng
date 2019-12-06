import React, { Component } from 'react';
import '../css/Rent.css';
import { createSpace } from '../services/api-helper.js'


export default class Rent extends Component {
  state = {
    spaceData: {
      name: '',
      description: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    images: [],
    newImage: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      spaceData: {
        ...prevState.spaceData,
        [name]: value
      }
    }))
  }

  handleImageChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      [name]: value
    }
    ))
  }

  spaceSubmit = async (e) => {
    e.preventDefault()
    if (this.state.spaceData.street && this.state.spaceData.description && this.state.spaceData.street && this.state.spaceData.city && this.state.spaceData.state && this.state.spaceData.zip && this.state.images.length>0) {
      const response = await createSpace(this.state.spaceData, this.state.images)
      this.props.history.push('/')
    }
  }

  addImage = (e) => {
    e.preventDefault();
    if (this.state.newImage.includes('/')&&this.state.images.length<5) {
      this.setState(prevState => ({
        images: [...prevState.images, this.state.newImage],
        newImage: ''
      }))
    }
  }

  removeImage = (e) => {
    const img = e.target.src
    const images = this.state.images.filter(image => (
      image==img
    ))
    this.setState({
      images
    })
  }


  render() {
    return (
      <div className='rent'>
        <h1>Rent Your Yard</h1>
        <form>
          <div className="rent-flex">
            <div className="left">
              <div className="pair">
                <label htmlFor='name'>Title</label> <br />
                <input name='name' type='text' value={this.state.spaceData.name} onChange={this.handleChange} />
              </div>
              <div className="pair">
                <label htmlFor='description'>Description</label> <br />
                <textarea name='description' value={this.state.spaceData.description} onChange={this.handleChange} />
              </div>
            </div>
            <div className="right">
              <div className="pair">
                <label htmlFor='street'>Street Address</label>
                <input name='street' type='text' value={this.state.spaceData.street} onChange={this.handleChange} />
              </div>
              <div className="pair">
                <label htmlFor='city'>City</label>
                <input name='city' type='text' value={this.state.spaceData.city} onChange={this.handleChange} />
              </div>
              <div className="state-zip">
                <div className="pair">
                  <label htmlFor='state'>State</label>
                  <input name='state' type='text' value={this.state.spaceData.state} onChange={this.handleChange} />
                </div>
                <div className="pair">
                  <label htmlFor='zip'>Zip</label>
                  <input name='zip' type='text' value={this.state.spaceData.zip} onChange={this.handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="rent-pics">
            <label htmlFor='img_url'>Image URL <small>(max 5)</small></label><br />
            <div className="add-pics">
              <input name='newImage' type='text' value={this.state.newImage} onChange={this.handleImageChange} />
              <button onClick={this.addImage}>Add</button>
            </div>
          </div>
          <div className="current-pics">
            {this.state.images.map(image => (
              <img onClick={this.removeImage} src={image} alt="" />
            ))}
          </div>
          <button onClick={this.spaceSubmit}>Rent my Yard!</button>
        </form>
      </div>
    )
  }
}
