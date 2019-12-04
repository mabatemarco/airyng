import React from 'react';
import '../css/Front.css';
import backyard1 from '../images/backyard1.png'
import backyard2 from '../images/backyard2.jpg'
import backyard3 from '../images/backyard3.jpg'
import backyard4 from '../images/backyard4.jpg'

export default function Front() {
  return (
    <div className='front'>
      <div className="hero">
        <h1>AirYnG</h1>
        <img src={backyard2} alt="" />
      </div>
    </div>
  )
}
