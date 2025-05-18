import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import api from '../services/api';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);

  const fetchEvents = async () => {
    const res = await api.get('/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await api.delete(`/events/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchEvents();
        if (eventToEdit?._id === id) setEventToEdit(null);
      } catch (err) {
        alert('Erro ao excluir evento');
      }
    }
  };

  const handleEdit = (event) => {
    setEventToEdit(event);
  };

  const handleCancelEdit = () => {
    setEventToEdit(null);
  };

  return (
    <div className="container main-content">
      <h2 className="title">Painel Administrativo</h2>
      <EventForm
        onSuccess={() => {
          fetchEvents();
          setEventToEdit(null);
        }}
        eventToEdit={eventToEdit}
        onCancel={handleCancelEdit}
      />
      <hr className="separator" />
      <h3 className="subtitle">Eventos Cadastrados</h3>
      <ul className="list">
        {events.map(event => (
          <li key={event._id} className="list-item">
            <span>
              {event.title} - {new Date(event.date).toLocaleString()}
            </span>
            <div>
              <button className="btn btn-primary" onClick={() => handleEdit(event)}>
                Editar
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(event._id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
