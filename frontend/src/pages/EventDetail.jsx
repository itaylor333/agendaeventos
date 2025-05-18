import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Erro ao carregar evento');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div>Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '16px',
          borderRadius: '4px',
          border: '1px solid #f5c6cb',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold',
        }}>
          ⚠️ {error}
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <p>Evento não encontrado</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ marginBottom: '16px' }}>{event.title}</h1>
      <p style={{ marginBottom: '16px' }}>{event.description}</p>

      <div style={{ marginBottom: '12px' }}>
        <strong>Data:</strong><br />
        {new Date(event.date).toLocaleString()}
      </div>

      <div>
        <strong>Local:</strong><br />
        {event.location}
      </div>
    </div>
  );
};

export default EventDetail;