import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './UserDialog.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const UserDialog = ({ user, onClose }) => {
  const handleSendFriendRequest = () => {
    const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const reqId = decodedToken.id;
    const userId = user._id; 
    
    console.log('Friend request sent to:', user.username);
    axios.put(`http://localhost:8800/users/${userId}`, { reqId })
  .then(response => {
    console.log('Requests field updated successfully:', response.data);
    alert('Friend request sent');
    window.location.reload();
    
  })
  
  .catch(error => {
    console.error('Error updating requests field:', error);
    
  });
 
  };

  return (
    <div className="dialog-box">
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>User Details</h2>
      <p>ID: {user._id}</p>
      <p>Username: {user.username}</p>
      
      <button className="send-friend-request-button" onClick={handleSendFriendRequest}>
        Send Friend Request
      </button>
    </div>
  );
};

export default UserDialog;
