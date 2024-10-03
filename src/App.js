import React, {useState, useEffect} from 'react'
import Landing from './components/Landing/Landing';
import Allevents from './components/Allevents/Allevents'
import Createevents from './components/Createevents/Createevents'
import Friends from './components/Friends/Friends'
import Signup from './components/Signup/Signup'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Profile from './components/Profile/Profile'
import Home from './components/Home/Home'
import PrivateRoute from "./PrivateRoute";
import Unauthorized from './Unauthorized';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


const App = () => {
  const [loggedIn, setLoggedIn] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const Logged = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        console.log("User ID:", userId);
        const response = await axios.get(`http://localhost:8800/users/${userId}`);
        // console.log("User:", response.data.user);
        if(response.ok){
          setLogin(true);
        }
        setLoggedIn(response.data.user);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    Logged();

  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact >
            <Landing/>
          </Route>
          <Route path="/friend" exact >
          <Friends/>
            
          </Route>
          <Route path="/signup" exact >
            <Signup/>
          </Route>
          <PrivateRoute path="/home" exact >
            <Home/>
          </PrivateRoute>
          <Route path="/all" exact >
            <Allevents/>
          </Route>
          <Route path="/profile" exact >
            <Profile/>
          </Route>
          <Route path="/Unauthorized" exact >
            <Unauthorized/>
          </Route>
          
          <Route path="/events" exact >
            <Createevents/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
