
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Edit from './Edit'; 

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false); 
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
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    Logged();

  }, []);

  const handleEditProfile = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <div className="profile-container">
        <div className="profile-header">
          <FontAwesomeIcon icon={faUserCircle} className='profile-picture' />
          <div className="profile-info">
            <h2 className='pname'>{userData.pname}</h2>
            <p>@{userData.username}</p>
            <button onClick={handleEditProfile}>Edit Profile</button>
          </div>
        </div>
        <div className="profile-bio">
          <p className='pname'>{userData.bio}</p>
        </div>
        <div className="profile-posts">

        </div>
      </div>
      {showModal && <Edit handleClose={handleCloseModal} userId={loggedIn}/>} 
    </div>
  );
};

export default Profile;
