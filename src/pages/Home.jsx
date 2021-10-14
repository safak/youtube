import React from "react";
import Navbar from "../Component/Navbar";
import Announcement from "../Component/Announcement";
import Slider from "../Component/Slider";
import Categories from "../Component/Categories";
import Products from "../Component/Products";
import NewsLetter from "../Component/NewsLetter";
const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
    </div>
  );
};

export default Home;
