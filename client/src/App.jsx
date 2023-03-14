import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter ,
  Route,
  redirect,
  Routes,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log("heheheeh")
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={user ? <Home /> : redirect("/register")}/> */}
        {/* <Route exact path="/" element={ <Home />}/> */}
        {/* <Route exact path="/" element={ redirect("/register")}/> */}
        {/* <Route exact path="/" element={ <Navigate to="/register" replace={true} />}/> */}
        <Route exact path="/" element={user ? <Home /> :<Register/> }/>
        <Route exact path="/register" element={ <Register />}/>
        <Route path="/login" element={!user ? <Login /> : <Home/>}/>

        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />}/>
              
            <Route path="/series" element={<Home type="series" />}/>
              
            <Route path="/watch" element={<Watch />}/>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
