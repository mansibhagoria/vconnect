import React, { useEffect, useState } from "react";
import "./Nav.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import UserDialog from "../UserDialog/UserDialog";
import Aside from "../Aside/Aside"; 
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function Nav() {
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [showAside, setShowAside] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const history = useHistory(); 
  const [loggedIn, setLoggedIn] = useState([]);

  
  useEffect(() => {
    const Logged = async () => {
      try {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log("User ID:", userId);
      const response = await axios.get(`http://localhost:8800/users/${userId}`);
      console.log("User:", response.data.user);
      setLoggedIn(response.data.user);
        
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };
    
    Logged();
    
  }, []); 


  const handleSearch = async () => {
    const search = document.getElementById('search').value;
    axios.get(`http://localhost:8800/users/search/${search}`)
      .then(response => {
        setUser(response.data.user);
        setShowDialog(true);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }

  const handleUser = () => {
    history.push('/profile');
  }
  const handleCloseDialog = () => {
    setShowDialog(false);
    setUser(null);
  }

  const handleBell = () => {
    console.log('Bell clicked');
  }

  const handleToggleAside = () => {
    setShowAside(!showAside);
  }
  
  const handleLogoClick = () => {
    history.push('/home');
  }

  const handleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown); 
  }

  const handleBellDropdown = () => {
    setShowBellDropdown(!showBellDropdown); 
  }

  const handleLogout = () => {
    Cookies.remove('token');
    history.push('/');
  }
  const handleNotification = () => {
    history.push('/all');
  }

  return (
    <nav className="Nav">
      <div className="menu__cont" onClick={handleToggleAside}>
        <AiOutlineMenu className="menu" />
      </div>

      <div className="logo__cont">
        <img
          src="vconnectlogo.png"
          alt=""
          className="logo"
          onClick={handleLogoClick}
        />
      </div>
      <div className="search__cont">
        <input type="text" placeholder="Search" id="search" className="search" />
        <button type="submit" className="search__btn" onClick={handleSearch}>
          <AiOutlineSearch className="search__icon" />
        </button>
      </div>
      {/* <BsFillBellFill className="bell" onClick={handleBell} /> */}
      <div className="dropdown">
        <FontAwesomeIcon icon={faUserCircle} className="bell" onClick={handleUserDropdown} />
        {showUserDropdown && (
          <div className="dropdown-content">
            <button className="dropdown-item" onClick={handleUser}>{loggedIn.username}</button>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="dropdown">
        <FontAwesomeIcon icon={faBell} className="bell" onClick={handleBellDropdown} />
        {showBellDropdown && (
          <div className="dropdown-content">
            <button className="dropdown-item" onClick={handleNotification}>New invites</button>
          </div>
        )}
      </div>
      {showDialog && user && <UserDialog user={user} onClose={handleCloseDialog} />}
      {showAside && <Aside />}
    </nav>
  );
}

export default Nav;
