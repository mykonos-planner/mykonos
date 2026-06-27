'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [itemType, setItemType] = useState('event');
  const [newEvent, setNewEvent] = useState({ date: '', name: '', venue: '', category: '', budget: 'mid' });
  const [newBeach, setNewBeach] = useState({ name: '', location: '', budget: '' });
  const [newRestaurant, setNewRestaurant] = useState({ name: '', cuisine: '', priceRange: '', note: '' });
  const [newExtra, setNewExtra] = useState({ name: '', serviceType: '', price: '', link: '' });
  const [filterType, setFilterType] = useState('all');
  const [filterVenue, setFilterVenue] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Tema
  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDark);
    document.body.style.backgroundColor = savedDark ? '#0f172a' : '#f0f7f4';
    document.body.style.color = savedDark ? '#e2e8f0' : '#1e2a3e';
  }, []);

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem('darkMode', newDark);
    document.body.style.backgroundColor = newDark ? '#0f172a' : '#f0f7f4';
    document.body.style.color = newDark ? '#e2e8f0' : '#1e2a3e';
  };

  const login = async () => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: password, action: 'auth' })
    });
    const data = await res.json();
    if (data.success) { setLoggedIn(true); fetchEvents(); }
    else alert('Password errata');
  };

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data.events || []);
  };

  const addItem = async () => {
    let item = null;
    if (itemType === 'event') {
      if (!newEvent.date || !newEvent.name) return alert('Compila data e nome');
      item = { ...newEvent, type: 'event' };
    } else if (itemType === 'beach') {
      if (!newBeach.name) return alert('Inserisci nome spiaggia');
      item = { ...newBeach, type: 'beach', category: 'Beach', date: null };
    } else if (itemType === 'restaurant') {
      if (!newRestaurant.name) return alert('Inserisci nome ristorante');
      item = { ...newRestaurant, type: 'restaurant', category: 'Restaurant', date: null };
    } else if (itemType === 'extra') {
      if (!newExtra.name) return alert('Inserisci nome servizio');
      item = { ...newExtra, type: 'extra', category: 'Service', date: null };
    }
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: password, action: 'add', event: item })
    });
    if (res.ok) {
      fetchEvents();
      setNewEvent({ date: '', name: '', venue: '', category: '', budget: 'mid' });
      setNewBeach({ name: '', location: '', budget: '' });
      setNewRestaurant({ name: '', cuisine: '', priceRange: '', note: '' });
      setNewExtra({ name: '', serviceType: '', price: '', link: '' });
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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: darkMode ? '#0f172a' : '#f0f7f4',
        padding: '20px'
      }}>
        <div style={{
          background: darkMode ? '#1e293b' : 'white',
          borderRadius: '32px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '48px' }}>🏝️</span>
          </div>
          <h2 style={{ marginBottom: '20px', color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>Accesso amministratore</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '48px',
              border: `1px solid ${darkMode ? '#475569' : '#cbd5e0'}`,
              background: darkMode ? '#0f172a' : 'white',
              color: darkMode ? '#e2e8f0' : '#1e2a3e',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={login}
            style={{
              background: '#0ea5e9',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '48px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              transition: 'background 0.2s'
            }}
          >
            Entra
          </button>
        </div>
      </div>
    );
  }

  const uniqueVenues = [...new Set(events.map(ev => ev.venue).filter(Boolean))];
  const filteredItems = events.filter(ev => {
    if (filterType !== 'all' && ev.type !== filterType) return false;
    if (filterVenue !== 'all' && ev.venue !== filterVenue) return false;
    return true;
  });

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      background: darkMode ? '#0f172a' : '#f0f7f4',
      minHeight: '100vh'
    }}>
      {/* Barra superiore con toggle e home */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          🏝️ Mykonos Admin
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={toggleDark}
            style={{
              background: darkMode ? '#f59e0b' : '#1e2a3e',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <a
            href="/"
            style={{
              background: '#0ea5e9',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '40px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            ← Torna al sito
          </a>
        </div>
      </div>

      {/* Form aggiunta */}
      <div style={{
        background: darkMode ? '#1e293b' : 'white',
        borderRadius: '28px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ marginBottom: '16px', color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>➕ Aggiungi nuovo contenuto</h3>
        <select
          value={itemType}
          onChange={e => setItemType(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '48px',
            marginBottom: '20px',
            background: darkMode ? '#0f172a' : '#f0f7f4',
            color: darkMode ? '#e2e8f0' : '#1e2a3e',
            border: `1px solid ${darkMode ? '#475569' : '#cbd5e0'}`
          }}
        >
          <option value="event">📅 Evento con data (Beach Club, Night Club, Boat Party)</option>
          <option value="beach">🏖️ Spiaggia</option>
          <option value="restaurant">🍽️ Ristorante</option>
          <option value="extra">⚡ Extra (noleggi, sport, transfer)</option>
        </select>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
          {itemType === 'event' && (
            <>
              <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} placeholder="Data" style={inputStyle(darkMode)} />
              <input type="text" value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} placeholder="Nome evento" style={inputStyle(darkMode)} />
              <input type="text" value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} placeholder="Locale" style={inputStyle(darkMode)} />
              <select value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})} style={selectStyle(darkMode)}>
                <option value="Night Club">Night Club</option><option value="Beach Club">Beach Club</option><option value="Restaurant">Restaurant</option><option value="Boat Party">Boat Party</option>
              </select>
              <select value={newEvent.budget} onChange={e => setNewEvent({...newEvent, budget: e.target.value})} style={selectStyle(darkMode)}>
                <option value="budget">Budget</option><option value="mid">Mid Range</option><option value="luxury">Luxury</option>
              </select>
            </>
          )}
          {itemType === 'beach' && (
            <>
              <input type="text" value={newBeach.name} onChange={e => setNewBeach({...newBeach, name: e.target.value})} placeholder="Nome spiaggia" style={inputStyle(darkMode)} />
              <input type="text" value={newBeach.location} onChange={e => setNewBeach({...newBeach, location: e.target.value})} placeholder="Zona (es. Paraga)" style={inputStyle(darkMode)} />
              <select value={newBeach.budget} onChange={e => setNewBeach({...newBeach, budget: e.target.value})} style={selectStyle(darkMode)}>
                <option value="">Budget (opzionale)</option><option value="budget">Budget</option><option value="mid">Mid Range</option><option value="luxury">Luxury</option>
              </select>
            </>
          )}
          {itemType === 'restaurant' && (
            <>
              <input type="text" value={newRestaurant.name} onChange={e => setNewRestaurant({...newRestaurant, name: e.target.value})} placeholder="Nome ristorante" style={inputStyle(darkMode)} />
              <input type="text" value={newRestaurant.cuisine} onChange={e => setNewRestaurant({...newRestaurant, cuisine: e.target.value})} placeholder="Cucina" style={inputStyle(darkMode)} />
              <input type="text" value={newRestaurant.priceRange} onChange={e => setNewRestaurant({...newRestaurant, priceRange: e.target.value})} placeholder="Prezzo medio" style={inputStyle(darkMode)} />
              <input type="text" value={newRestaurant.note} onChange={e => setNewRestaurant({...newRestaurant, note: e.target.value})} placeholder="Note" style={inputStyle(darkMode)} />
            </>
          )}
          {itemType === 'extra' && (
            <>
              <input type="text" value={newExtra.name} onChange={e => setNewExtra({...newExtra, name: e.target.value})} placeholder="Nome servizio" style={inputStyle(darkMode)} />
              <select value={newExtra.serviceType} onChange={e => setNewExtra({...newExtra, serviceType: e.target.value})} style={selectStyle(darkMode)}>
                <option value="jetski">Jetski</option><option value="boat">Boat rental</option><option value="car">Car rental</option><option value="scooter">Scooter</option><option value="atv">ATV</option><option value="transfer">Transfer</option>
              </select>
              <input type="text" value={newExtra.price} onChange={e => setNewExtra({...newExtra, price: e.target.value})} placeholder="Prezzo" style={inputStyle(darkMode)} />
              <input type="text" value={newExtra.link} onChange={e => setNewExtra({...newExtra, link: e.target.value})} placeholder="Link (opzionale)" style={inputStyle(darkMode)} />
            </>
          )}
          <button onClick={addItem} style={{
            background: '#0ea5e9',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '48px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Aggiungi</button>
        </div>
      </div>

      {/* Filtri */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={selectStyle(darkMode)}>
          <option value="all">📋 Tutti i tipi</option>
          <option value="event">📅 Eventi con data</option>
          <option value="beach">🏖️ Spiagge</option>
          <option value="restaurant">🍽️ Ristoranti</option>
          <option value="extra">⚡ Extra</option>
        </select>
        <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={selectStyle(darkMode)}>
          <option value="all">📍 Tutti i locali</option>
          {uniqueVenues.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {/* Lista elementi */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: darkMode ? '#94a3b8' : '#64748b' }}>
            Nessun contenuto trovato.
          </div>
        )}
        {filteredItems.map(ev => {
          let borderColor = '#cbd5e0';
          let icon = '📄';
          if (ev.type === 'event') { borderColor = '#0ea5e9'; icon = '📅'; }
          else if (ev.type === 'beach') { borderColor = '#f59e0b'; icon = '🏖️'; }
          else if (ev.type === 'restaurant') { borderColor = '#10b981'; icon = '🍽️'; }
          else if (ev.type === 'extra') { borderColor = '#8b5cf6'; icon = '⚡'; }
          return (
            <div key={ev.id} style={{
              background: darkMode ? '#1e293b' : 'white',
              borderRadius: '20px',
              padding: '16px',
              borderLeft: `6px solid ${borderColor}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>
                <span style={{ marginRight: '8px' }}>{icon}</span>
                {ev.date && <strong>{ev.date}</strong>}
                {!ev.date && <strong>📌</strong>}
                {' '}
                <strong>{ev.name}</strong>
                {ev.venue && <span> @ {ev.venue}</span>}
                {ev.location && <span> 📍 {ev.location}</span>}
                {ev.cuisine && <span> 🍳 {ev.cuisine}</span>}
                {ev.serviceType && <span> ⚙️ {ev.serviceType}</span>}
                {ev.budget && <span> (💵 {ev.budget})</span>}
                {ev.priceRange && <span> 💶 {ev.priceRange}</span>}
                {ev.note && <div><small style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{ev.note}</small></div>}
              </div>
              <button onClick={() => deleteEvent(ev.id)} style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '40px',
                padding: '6px 16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>Elimina</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Stili riutilizzabili
const inputStyle = (darkMode) => ({
  padding: '10px 16px',
  borderRadius: '48px',
  border: `1px solid ${darkMode ? '#475569' : '#cbd5e0'}`,
  background: darkMode ? '#0f172a' : 'white',
  color: darkMode ? '#e2e8f0' : '#1e2a3e',
  fontSize: '0.9rem',
  flex: '1 1 200px'
});

const selectStyle = (darkMode) => ({
  padding: '10px 16px',
  borderRadius: '48px',
  border: `1px solid ${darkMode ? '#475569' : '#cbd5e0'}`,
  background: darkMode ? '#0f172a' : 'white',
  color: darkMode ? '#e2e8f0' : '#1e2a3e',
  fontSize: '0.9rem',
  flex: '1 1 180px'    
});  


                 
