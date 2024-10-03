import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faUserFriends, faPlus, faBars, faSearch, faBell, faUserCircle, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Home.css'; 
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Nav from "../Nav/Nav";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const Home = () => {
  
  const [loggedIn, setLoggedIn] = useState([]);
  const [events, setEvents] = useState([]);
  const [trend, setTrend] = useState([]);
  
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
  
  
  useEffect(() => {
  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8800/events/accept');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }}
    getEvents();
  },[events]);


  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8800/events/');
        setTrend(response.data);
        
        
      } catch (error) {
        console.error('Error fetching events:', error);
      }}
      getEvents();
    }, [trend]);

    const handleAccept = async (e) => {
      try{
        const response = await axios.post('http://localhost:8800/events/accept', e);
        
        console.log("accept button clicked ", e._id);
        alert('Event Accepted');
      }catch(error){
        console.log(error);
      }
      try{
        const response = await axios.delete(`http://localhost:8800/events/delete/${e._id}`);
        
      }catch(error){
        console.log(error);
      } 
      
    };
    const handleDecline = async (e) => {
      try{
        const response = await axios.delete(`http://localhost:8800/events/delete/${e._id}`);
        console.log("decline button clicked ", e._id);
        alert('Event Declined');
      }catch(error){
        console.log(error);
      }}

      const handleCloseDialog = () => {
        setShowDialog(false);
        setUser(null); 
      }

  return (

    
    <div className="page-container">
      <Nav />
      <div className="content-container">
        
        <div className="main-content">
        <div className="header">
            <div className="trending-events-bar">
              <span className="trending-events-text">Trending Events Going On</span>
            </div>
          </div>
          {trend.slice(-2).map((event, index) => (
          <div key={index} className="header">
            <div className="square-box">
              <div className="box-content">
                <span className="event-name">{event.eventName}</span>
                
                {/* <div className="event-details">
          <p>Date: {event.eventDate}</p>
          <p>Time: {event.eventTime}</p>
          <p>Venue: {event.eventVenue}</p>
          
        </div> */}
           
            <button className="clo" onClick={()=> handleDecline(event)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button className="acc-button" onClick={() => handleAccept(event)}>Accept</button>
          </div>
            </div>

          </div>
))}

          
        </div>
        <div className="main-content">
        <div className="trending-events-bar">
              <span className="trending-events-text">My Events</span>
        </div>
        {events.map((event, index) => (
        <div key={index} className="header">
      
        
        <div className="square-box">
          <div className="box-content">
            <span className="event-name">{event.eventName}</span>
            
          </div>
        </div>
        <div className="square-box">
          <div className="box">
            <span className="event-name">Schedule :</span>
            {/* <span className="event-name">{event.eventDate}</span> */}
            <span className="event-name">{event.eventTime}</span>
            <span className="event-name">{event.eventVenue}</span>
            <span className="event-name">By: {event.inviteBy}</span>

          </div>
        </div>
        </div>
        
      ))}
      </div>
      </div>
    </div>
     
  );
}

export default Home;
