'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: '', name: '', venue: '', category: '', budget: 'mid' });

  const login = async () => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: password, action: 'list' })
    });
    if (res.ok) {
      setLoggedIn(true);
      fetchEvents();
    } else {
      alert('Password errata');
    }
  };

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data.events || []);
  };

  const addEvent = async () => {
    if (!newEvent.date || !newEvent.name) return alert('Compila data e nome');
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: password, action: 'add', event: newEvent })
    });
    if (res.ok) {
      fetchEvents();
      setNewEvent({ date: '', name: '', venue: '', category: '', budget: 'mid' });
    } else alert('Errore');
  };

  const deleteEvent = async (id) => {
    if (!confirm('Eliminare?')) return;
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: password, action: 'delete', event: { id } })
    });
    fetchEvents();
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '100px auto', background: 'white', padding: 30, borderRadius: 20 }}>
        <h2>🔐 Accesso admin</h2>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 16, border: '1px solid #ccc' }} />
        <button onClick={login} style={{ background: '#1e2a3e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 40 }}>Entra</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 20 }}>
      <h2>✏️ Gestione eventi Mykonos</h2>
      <div style={{ background: '#f0f2f5', padding: 20, borderRadius: 20, marginBottom: 30 }}>
        <h3>➕ Aggiungi nuovo evento</h3>
        <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} placeholder="Data" style={{ margin: 5, padding: 8, borderRadius: 12, border: '1px solid #ccc' }} />
        <input type="text" value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} placeholder="Nome evento" style={{ margin: 5, padding: 8, borderRadius: 12, border: '1px solid #ccc' }} />
        <input type="text" value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} placeholder="Locale (es. Scorpios)" style={{ margin: 5, padding: 8, borderRadius: 12, border: '1px solid #ccc' }} />
        <select value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})} style={{ margin: 5, padding: 8, borderRadius: 12 }}>
          <option value="Night Club">Night Club</option><option value="Beach Club">Beach Club</option><option value="Restaurant">Restaurant</option><option value="Boat Party">Boat Party</option>
        </select>
        <select value={newEvent.budget} onChange={e => setNewEvent({...newEvent, budget: e.target.value})} style={{ margin: 5, padding: 8, borderRadius: 12 }}>
          <option value="budget">Budget</option><option value="mid">Mid Range</option><option value="luxury">Luxury</option>
        </select>
        <button onClick={addEvent} style={{ background: '#2c7a47', color: 'white', padding: '8px 16px', margin: 5, border: 'none', borderRadius: 20 }}>Aggiungi</button>
      </div>

      <h3>📋 Eventi esistenti</h3>
      {events.map(ev => (
        <div key={ev.id} style={{ border: '1px solid #ccc', borderRadius: 16, padding: 12, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><strong>{ev.date}</strong> – {ev.name} @ {ev.venue} ({ev.category}, {ev.budget})</div>
          <button onClick={() => deleteEvent(ev.id)} style={{ background: '#c0392b', color: 'white', border: 'none', borderRadius: 20, padding: '6px 12px' }}>🗑️ Elimina</button>
        </div>
      ))}
    </div>
  );
}