import React from 'react';
import '../css/Front.css';
import backyard1 from '../images/backyard1.png';
import backyard4 from '../images/backyard4.jpg';
import backyard2 from '../images/backyard2.jpg';
import backyard3 from '../images/backyard3.jpg';
import pee from '../images/pee.jpg'

export default function Front() {
  return (
    <div className='front'>
      <div className="hero">
        <h1>Urban <br /> Suburbanite</h1>
        <div id="slide-holder">
          <div class="slide"><img src={backyard3} alt="" /></div>
          <div class="slide"><img src={backyard2} alt="" /></div>
          <div class="slide"><img src={backyard1} alt="" /></div>
          <div class="slide"><img src={backyard4} alt="" /></div>
        </div>
      </div>
      <div className="about">
        <div className="about-card">
          <h2>Private Outdoor Spaces</h2>
          <img src={backyard4} alt="" />
          <p>Enjoy the summer and the beautiful green spaces your city has to offer without the frustrations of public spaces.  Spend time with you friends and family in clean and private yards.</p>
        </div>
        <div className="about-card">
          <h2>Earn Money</h2>
          <img src={backyard1} alt="" />
          <p>Don't let your yard go to waste.  You've spent time, effort, and money transforming your yard into a space you're proud of, now let it work for you.</p>
        </div>
        <div className="about-card">
          <h2>Where Will They Pee?</h2>
          <img src={pee} alt="" />
          <p>I sincerely do not know.</p>
        </div>
      </div>
    </div>
  )
}
