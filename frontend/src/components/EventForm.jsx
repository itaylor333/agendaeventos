import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EventForm = ({ onSuccess, eventToEdit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
      setDate(eventToEdit.date.slice(0, 16)); // para datetime-local
      setLocation(eventToEdit.location);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    }
  }, [eventToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (eventToEdit) {
        // Editar
        await api.put(
          `/events/${eventToEdit._id}`,
          { title, description, date, location },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      } else {
        // Criar
        await api.post(
          '/events',
          { title, description, date, location },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrição</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Data</label>
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Localização</label>
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : eventToEdit ? 'Editar Evento' : 'Criar Evento'}
        </button>
        {eventToEdit && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
