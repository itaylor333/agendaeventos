import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Link to={`/eventos/${event._id}`} className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>
      <p className="event-details">
        {new Date(event.date).toLocaleDateString()} — {event.location}
      </p>
    </Link>
  );
};

export default EventCard;
