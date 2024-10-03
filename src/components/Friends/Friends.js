import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faUserFriends, faPlus, faBars, faSearch, faBell, faUserCircle, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Friends.css'; 
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Nav from '../Nav/Nav';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const Friends = () => {
  const history = useHistory();
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log("User ID:", userId);
      const response = await axios.get(`http://localhost:8800/users/${userId}`);
        console.log('Friend requests:', response.data.user.requests);
        setFriendRequests(response.data.user.requests);
        setFriends(response.data.user.friends);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };
    
    fetchFriendRequests();
    
  }, []); 

  
  const handleDecline = async (request) => {
    try{
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.delete(`http://localhost:8800/users/${userId}/requests/${request}`);
      
      window.location.reload();
    }catch(error){
      console.log(error);
    }}

    const handleAccept = async (request) => {
      try{
        const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
        const response = await axios.delete(`http://localhost:8800/users/${userId}/requests/${request}`);
        window.location.reload();
        
      }catch(error){
        console.log(error);
      }
      try{
        const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
        const response = await axios.put(`http://localhost:8800/users/${userId}/requests/${request}`);
        
        
      }catch(error){
        console.log(error);
      }
    }

  return (
    <div className="page-container">
      <Nav/>
      <div className="content-container">
        <div className="main-content">
        <div className="trending-events-bar">
              <span className="trending-events-text">Pending Connection Requests</span>
        </div>
        {friendRequests.map((request, index) => (
          <div key={index} className="header">
            
              <div  className="friend-request">
                <div className="profile-photo">
                <FontAwesomeIcon icon={faUserCircle} className='profile-photo' />
                </div>
                <div className="friend-details">
                  <span className="username">{request}</span>
                  <div className="action-buttons">
                    <button className="accept-button" onClick={()=>handleAccept(request)} >Accept</button>
                    <button className="decline-button" onClick={() => handleDecline(request)}>Decline</button>
                  </div>
                </div>
              </div>
              </div>
            ))}
            <div className="trending-events-bar">
              <span className="trending-events-text">My friends</span>
        </div>
        {friends.map((request, index) => (
          <div key={index} className="header">
            
              <div  className="friend-request">
                <div className="profile-photo">
                <FontAwesomeIcon icon={faUserCircle} className='profile-photo' />
                </div>
                <div className="friend-details">
                  <span className="username">{request}</span>
                  <div className="action-buttons">
                    {/* <button className="accept-button" onClick={handleAccept} >Accept</button> */}
                    <button className="decline-button" onClick={() => handleDecline(request)} >Remove Friend</button>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
          
      </div>
    </div>
  );
}

export default Friends;
