import React from "react";
import Navbar from "../Component/Navbar";
import Announcement from "../Component/Announcement";
import Slider from "../Component/Slider";
import Categories from "../Component/Categories";
const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
<Categories/>
    </div>
  );
};

export default Home;
