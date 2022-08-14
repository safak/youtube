import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Announcement/>
      <Products/>
    </div>
  )
}

export default Home
