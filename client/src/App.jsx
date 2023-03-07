import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Route,
  redirect,
  Routes
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : redirect("/register")}/>
          
        <Route path="/register" element={!user ? <Register /> : redirect("/")}/>


        <Route path="/login" element={!user ? <Login /> : redirect("/")}/>
        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />}/>
              
            
            <Route path="/series" element={<Home type="series" />}/>
              
            <Route path="/watch" element={<Watch />}/>
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
