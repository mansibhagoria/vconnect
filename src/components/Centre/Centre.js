import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Centre.css";
import Dialog from "../Dialog/Dialog";
import Accept from "../Accept/Accept";

function Centre({ names }) {
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);

  const accept = (event) => {
    console.log(
      "Invite for " +
        event.eventName +
        " accepted on the date " +
        event.eventDate +
        "!"
    );
    setIsAcceptOpen(true);
  };

  const handleCreateClick = () => {
    setIsDialogOpen(true);
  };
  const details = () => {
    setIsAcceptOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsAcceptOpen(false);
  };

  useEffect(() => {
    // Fetch event data when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8800/events");

        if (response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };

    fetchEvents();
  }, [events]);

  return (
    <div className="Post">
      <div className="Invite">
        <h1>Create Invite</h1>
        <p>Send a new Invitation</p>
        <button type="button" className="submit" onClick={handleCreateClick}>
          Create
        </button>
      </div>

      {isDialogOpen && (
        <div className="Dialog">
          <Dialog onClose={handleCloseDialog} />
        </div>
      )}

      {events.map((event, index) => (
        <React.Fragment key={index}>
          <div key={index} className="Invites">
            <h1>Invite {index + 1}</h1>
            <h3>{event.eventDate}</h3>
            <p>Invite for the {event.eventName}</p>
            <button type="button" className="submit" onClick={details}>
              Details
            </button>
          </div>
          {isAcceptOpen && (
            <div className="Dialog">
              <Accept
                onClose={handleCloseDialog}
                onAccept={() => accept(event)}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Centre;
