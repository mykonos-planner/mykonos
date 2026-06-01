'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [itemType, setItemType] = useState('event'); // event, beach, restaurant, extra
  const [newEvent, setNewEvent] = useState({ date: '', name: '', venue: '', category: '', budget: 'mid' });
  const [newBeach, setNewBeach] = useState({ name: '', location: '', budget: '' });
  const [newRestaurant, setNewRestaurant] = useState({ name: '', cuisine: '', priceRange: '', note: '' });
  const [newExtra, setNewExtra] = useState({ name: '', serviceType: '', price: '', link: '' });
  const [filterType, setFilterType] = useState('all');
  const [filterVenue, setFilterVenue] = useState('all');

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
      // reset forms
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
    return <div style={{ maxWidth: 400, margin: '100px auto', background: 'white', padding: 30, borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2>🔐 Accesso admin</h2>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 16, border: '1px solid #ccc' }} />
      <button onClick={login} style={{ background: '#1e2a3e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 40 }}>Entra</button>
    </div>;
  }

  const uniqueVenues = [...new Set(events.map(ev => ev.venue).filter(Boolean))];
  const filteredItems = events.filter(ev => {
    if (filterType !== 'all' && ev.type !== filterType) return false;
    if (filterVenue !== 'all' && ev.venue !== filterVenue) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>✏️ Gestione contenuti Mykonos</h2>
        <a href="/" style={{ background: '#1e2a3e', color: 'white', padding: '8px 16px', borderRadius: 40, textDecoration: 'none' }}>← Torna alla home</a>
      </div>

      {/* Selettore tipo e form dinamico */}
      <div style={{ background: '#f0f2f5', padding: 20, borderRadius: 20, marginBottom: 30 }}>
        <h3>➕ Aggiungi nuovo</h3>
        <select value={itemType} onChange={e => setItemType(e.target.value)} style={{ padding: 8, borderRadius: 16, marginBottom: 15 }}>
          <option value="event">Evento con data (Beach Club, Night Club, Boat Party)</option>
          <option value="beach">Spiaggia (Beach)</option>
          <option value="restaurant">Ristorante</option>
          <option value="extra">Extra (noleggi, sport, transfer)</option>
        </select>

        {itemType === 'event' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} placeholder="Data" />
            <input type="text" value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} placeholder="Nome evento" />
            <input type="text" value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} placeholder="Locale" />
            <select value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})}>
              <option value="Night Club">Night Club</option><option value="Beach Club">Beach Club</option><option value="Restaurant">Restaurant</option><option value="Boat Party">Boat Party</option>
            </select>
            <select value={newEvent.budget} onChange={e => setNewEvent({...newEvent, budget: e.target.value})}>
              <option value="budget">Budget</option><option value="mid">Mid Range</option><option value="luxury">Luxury</option>
            </select>
          </div>
        )}

        {itemType === 'beach' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <input type="text" value={newBeach.name} onChange={e => setNewBeach({...newBeach, name: e.target.value})} placeholder="Nome spiaggia" />
            <input type="text" value={newBeach.location} onChange={e => setNewBeach({...newBeach, location: e.target.value})} placeholder="Zona (es. Paraga, Psarou)" />
            <select value={newBeach.budget} onChange={e => setNewBeach({...newBeach, budget: e.target.value})}>
              <option value="">Budget (opzionale)</option><option value="budget">Budget</option><option value="mid">Mid Range</option><option value="luxury">Luxury</option>
            </select>
          </div>
        )}

        {itemType === 'restaurant' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <input type="text" value={newRestaurant.name} onChange={e => setNewRestaurant({...newRestaurant, name: e.target.value})} placeholder="Nome ristorante" />
            <input type="text" value={newRestaurant.cuisine} onChange={e => setNewRestaurant({...newRestaurant, cuisine: e.target.value})} placeholder="Tipo cucina" />
            <input type="text" value={newRestaurant.priceRange} onChange={e => setNewRestaurant({...newRestaurant, priceRange: e.target.value})} placeholder="Prezzo medio (es. 50-80€)" />
            <input type="text" value={newRestaurant.note} onChange={e => setNewRestaurant({...newRestaurant, note: e.target.value})} placeholder="Note (es. vista tramonto)" />
          </div>
        )}

        {itemType === 'extra' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <input type="text" value={newExtra.name} onChange={e => setNewExtra({...newExtra, name: e.target.value})} placeholder="Nome servizio (es. Jetski)" />
            <select value={newExtra.serviceType} onChange={e => setNewExtra({...newExtra, serviceType: e.target.value})}>
              <option value="jetski">Jetski</option><option value="boat">Boat rental</option><option value="car">Car rental</option><option value="scooter">Scooter</option><option value="atv">ATV</option><option value="transfer">Transfer</option>
            </select>
            <input type="text" value={newExtra.price} onChange={e => setNewExtra({...newExtra, price: e.target.value})} placeholder="Prezzo indicativo" />
            <input type="text" value={newExtra.link} onChange={e => setNewExtra({...newExtra, link: e.target.value})} placeholder="Link (opzionale)" />
          </div>
        )}

        <button onClick={addItem} style={{ marginTop: 15, background: '#2c7a47', color: 'white', padding: '8px 20px', border: 'none', borderRadius: 20 }}>Aggiungi</button>
      </div>

      {/* Filtri per la visualizzazione */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: 8, borderRadius: 20 }}>
          <option value="all">Tutti i tipi</option>
          <option value="event">Eventi con data</option>
          <option value="beach">Spiagge</option>
          <option value="restaurant">Ristoranti</option>
          <option value="extra">Extra</option>
        </select>
        <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={{ padding: 8, borderRadius: 20 }}>
          <option value="all">Tutti i locali (solo eventi)</option>
          {uniqueVenues.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {/* Lista elementi */}
      <h3>📋 Contenuti esistenti</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredItems.map(ev => (
          <div key={ev.id} style={{ background: '#f9f9f9', borderRadius: 16, padding: 16, borderLeft: `6px solid ${ev.type === 'event' ? '#3498db' : ev.type === 'beach' ? '#f1c40f' : ev.type === 'restaurant' ? '#e67e22' : '#2ecc71'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <strong>{ev.type === 'event' ? ev.date : '📌'}</strong> – <strong>{ev.name}</strong>
                {ev.venue && <span> @ {ev.venue}</span>}
                {ev.location && <span> 📍 {ev.location}</span>}
                {ev.cuisine && <span> 🍽️ {ev.cuisine}</span>}
                {ev.serviceType && <span> ⚙️ {ev.serviceType}</span>}
                {ev.budget && <span> (💵 {ev.budget})</span>}
                {ev.priceRange && <span> 💶 {ev.priceRange}</span>}
                {ev.note && <div><small>{ev.note}</small></div>}
              </div>
              <button onClick={() => deleteEvent(ev.id)} style={{ background: '#c0392b', color: 'white', border: 'none', borderRadius: 20, padding: '6px 12px', cursor: 'pointer' }}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
