import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faUserFriends, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Aside.css';
import { useHistory } from 'react-router-dom';

const Aside = () => {

    const history = useHistory();
    const handleHome = () => {
       history.push('/home');
    }
    const handleEvents = () => {
       history.push('/all');
    }
    const handleFriends = () => {
       history.push('/friend');
    } 
    const handleInvite = () => {
      history.push('/events');
    }
  return (
    <aside className="sidebar">
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faHome} className="sidebar-icon-white" />
        <button id="btn-1" onClick={handleHome}><span className="sidebar-text" >Home</span></button>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faClock} className="sidebar-icon-white" />
        <button id='btn-2' onClick={handleEvents}><span className="sidebar-text">Events</span></button>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faUserFriends} className="sidebar-icon-white" />
        <button id='btn-3' onClick={handleFriends}><span className="sidebar-text">Friends</span></button>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faPlus} className="sidebar-icon-white" />
        <button id='btn-4' onClick={handleInvite}><span className="sidebar-text" >Invite</span></button>
      </div>
    </aside>
  );
};

export default Aside;
