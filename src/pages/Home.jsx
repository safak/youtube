import React from "react";
import Navbar from "../Component/Navbar";
import Announcement from "../Component/Announcement";
import Slider from "../Component/Slider";
import Categories from "../Component/Categories";
import Products from "../Component/Products";
const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
<Categories/>
<Products/>
    </div>
  );
};

export default Home;
