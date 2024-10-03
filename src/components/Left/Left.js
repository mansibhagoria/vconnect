import React from 'react';
import './Left.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function Left({name}) {

  const [partner, setPartner] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("Shahid");

  const getProfilePic = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/profile-pic/${username}`);
      setProfilePic(response.data);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  useEffect(() => {
    getProfilePic();
  }, [username]);
  return (
    <div className='Info'>
      <h2>Profile</h2>
      <div className="profilepic">
      <img src='/2.jpg'  className="profilepic" />
      </div>
    
      <p className='black'>{name.username}</p>
      <p className='black'>{name.age}</p>
      <p className='black'>{name.gender}</p>
    </div>
  );
}

export default Left;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Left.css';

// function Left({ name }) {
//   const [profilePic, setProfilePic] = useState(null);
//   const [username, setUsername] = useState("Shahid");

//   const getProfilePic = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8800/users/profile-pic/${username}`, {
//         responseType: 'arraybuffer',
//       });

//       const arrayBufferView = new Uint8Array(response.data);
//       const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
//       const imageUrl = URL.createObjectURL(blob);

//       setProfilePic(imageUrl);
//     } catch (error) {
//       console.error('Error fetching profile picture:', error);
//     }
//   };

//   useEffect(() => {
//     getProfilePic();
//   }, [username]);

//   return (
//     <div class="parallax-bg">
//     <div className='Info'>
//       <h2>Profile</h2>
//       <div className="profilepic">
//         {/* Use the state variable for the profile picture */}
//         <img src={profilePic || '/1.jpg'} className="profilepic" alt="Profile" />
//       </div>

//       <p className='black'>{name.username}</p>
//       <p className='black'>{name.age}</p>
//       <p className='black'>{name.gender}</p>
//     </div>
//     </div>
//   );
// }

// export default Left;
