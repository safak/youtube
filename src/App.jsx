import react,{useState} from "react";
import Twitter from "./components/Twitter";
import Intro from "./components/intro/Intro"
import Nav from "./components/pages/nav";
import About from "./components/pages/about";
import Shop from "./components/pages/shop";
import './App.css'

const App = () => {
  const [users,setUsers] = useState([
    {name:"Aniket", message:"I'M THE GRETEST"},
    {name:"Rahul", message:"I'M THE FUNNIEST"},
    {name:"Aditya", message:"I'M THE STRONGEST"}

  ]);
  return(
    <div className="APP"> 
      <Nav className="nav" />
        {/* <Route path="/about" component={About}/> */}
      <div className="main">
      <Intro  className="intro"/>
    <div className="twitter">
      {users.map(user=>(
        <Twitter name={user.name} message={user.message}/>
        ))}
      </div>
       </div>
    </div>
  ); 
};

export default App;