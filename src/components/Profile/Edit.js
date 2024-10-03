import React, { useState, useEffect } from 'react';
import './Edit.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const Edit = ({ handleClose }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const Logged = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        console.log("User ID:", userId);
        setUserId(userId);
        
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    Logged();

  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8800/users/update/${userId}`, {
          username,
          bio,
          password
        });
        
        console.log(response.data); 

      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    handleClose();
    window.location.reload();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        
        <div className="modal-content">
          <h2>Edit Profile</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                className='input'
                onChange={handleUsernameChange}
                placeholder="Enter new username"
              />
            </div>
            <div className="form-group">
              <label className='label' htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={bio}
                className='textarea'
                onChange={handleBioChange}
                placeholder="Enter your bio"
              />
            </div>
            <div className="form-group">
              <label className='label' htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                className='input'
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label className='label' htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className='input'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm new password"
              />
            </div>
            
            <button type="submit">Save Changes</button>
            {/* <button type="close" onClick={handleClose}>Close</button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
