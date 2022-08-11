import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Announcement/>
    </div>
  )
}

export default Home
