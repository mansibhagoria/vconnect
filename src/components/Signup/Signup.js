import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useHistory } from 'react-router-dom';

const SignUp1 = () => {
  const [userData, setUserData] = useState({
    pname: '',
    username: '',
    password: '',
  
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/users/sign', userData);
      console.log('New user created:', response.data);
      history.push('/');
      // Handle success response, like redirecting to another page or showing a success message
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error, like showing an error message to the user
    }
  };

  return (
    <div className="landing-container">
      <div className="left-section">
        <img src="./vconnectlogo.png" alt="Logo" />
      </div>

      <div className="right-section">
        <div className="connect-text">
          <span className="first-color" style={{ fontSize: '24px' }}>Let's </span>
          <span className="second-color" style={{ fontSize: '24px' }}>connect</span>
        </div>
      </div>

      <div className="buttons-section">
        <form onSubmit={handleSubmit}>
          <input
            id="button1"
            className="input-field"
            type="text"
            name="pname"
            placeholder="Enter your name"
            value={userData.pname}
            onChange={handleChange}
          /><br/>
          <input
            id="button2"
            className="input-field"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleChange}
          /><br/>
          <input
            id="button3"
            className="input-field"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleChange}
          /><br/>
          
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp1;