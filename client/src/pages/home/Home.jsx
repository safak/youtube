import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      console.log("getRandomLists called");
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        console.log("getRandomLists success res.data is: ", res.data);
        setLists(res.data);
      } catch (err) {
        console.log("getRandomLists err: ",err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <p>dsadsads</p>
      <Navbar /> 
      { <Featured type={type} setGenre={setGenre} />}
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
