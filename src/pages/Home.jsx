import React from 'react';
import CurrentLoans from '../components/CurrentLoans';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header/>
      <CurrentLoans/>
      <Footer/>
      </div>
  )
}

export default Home