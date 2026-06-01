'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [lang, setLang] = useState('it');
  const [activeTab, setActiveTab] = useState('explore');
  const [formData, setFormData] = useState({
    name: '', groupSize: 2, arrivalDate: '', stayDays: '7', customDays: '', budget: 'mid'
  });
  const [generatedMsg, setGeneratedMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterVenue, setFilterVenue] = useState('all');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data.events || []));
    const savedDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDark);
    document.body.style.backgroundColor = savedDark ? '#0a1a2a' : '#e6f0f5';
    document.body.style.color = savedDark ? '#e2e8f0' : '#1e2a3e';
  }, []);

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem('darkMode', newDark);
    document.body.style.backgroundColor = newDark ? '#0a1a2a' : '#e6f0f5';
    document.body.style.color = newDark ? '#e2e8f0' : '#1e2a3e';
  };

  // Traduzioni
  const translations = {
    it: {
      explore: '📅 Eventi',
      planning: '✍️ Planning',
      services: '🏖️ Locali & Servizi',
      name: 'Nome e cognome',
      nameDesc: 'Come vuoi essere chiamato?',
      group: 'Numero di persone',
      groupDesc: 'Quanti siete?',
      arrival: 'Data di arrivo',
      arrivalDesc: 'Quando arrivi a Mykonos?',
      days: 'Giorni di soggiorno',
      daysDesc: 'Per quanti giorni resti?',
      budgetLabel: 'Budget',
      budgetDesc: 'Che tipo di esperienza cerchi?',
      generate: 'Genera messaggio',
      copy: 'Copia',
      categories: { 'Night Club': 'Night Club', 'Beach Club': 'Beach Club', 'Restaurant': 'Ristorante', 'Boat Party': 'Boat Party', 'Service': 'Servizio', 'Beach': 'Spiaggia' },
      serviceTypes: { jetski: 'Jetski', boat: 'Noleggio Barca', car: 'Auto', scooter: 'Scooter', atv: 'ATV', transfer: 'Transfer', restaurant: 'Ristorante' },
      beachClubs: 'Beach Club',
      nightClubs: 'Night Club',
      restaurants: 'Ristoranti',
      extras: 'Extra (noleggi, transfer, sport)',
      backToHome: '← Torna alla home',
      filterCat: 'Filtra per categoria',
      filterVenue: 'Filtra per locale',
      all: 'Tutti'
    },
    en: {
      explore: '📅 Events',
      planning: '✍️ Planning',
      services: '🏖️ Venues & Services',
      name: 'Full name',
      nameDesc: 'What should I call you?',
      group: 'Number of people',
      groupDesc: 'How many are you?',
      arrival: 'Arrival date',
      arrivalDesc: 'When do you arrive in Mykonos?',
      days: 'Days of stay',
      daysDesc: 'How many days?',
      budgetLabel: 'Budget',
      budgetDesc: 'What kind of experience?',
      generate: 'Generate message',
      copy: 'Copy',
      categories: { 'Night Club': 'Night Club', 'Beach Club': 'Beach Club', 'Restaurant': 'Restaurant', 'Boat Party': 'Boat Party', 'Service': 'Service', 'Beach': 'Beach' },
      serviceTypes: { jetski: 'Jetski', boat: 'Boat Rental', car: 'Car', scooter: 'Scooter', atv: 'ATV', transfer: 'Transfer', restaurant: 'Restaurant' },
      beachClubs: 'Beach Clubs',
      nightClubs: 'Night Clubs',
      restaurants: 'Restaurants',
      extras: 'Extras (rentals, transfer, sports)',
      backToHome: '← Back to home',
      filterCat: 'Filter by category',
      filterVenue: 'Filter by venue',
      all: 'All'
    },
    fr: {
      explore: '📅 Événements',
      planning: '✍️ Planification',
      services: '🏖️ Lieux & Services',
      name: 'Nom complet',
      nameDesc: 'Comment t\'appeler?',
      group: 'Nombre de personnes',
      groupDesc: 'Vous êtes combien?',
      arrival: "Date d'arrivée",
      arrivalDesc: 'Quand arrives-tu à Mykonos?',
      days: 'Jours de séjour',
      daysDesc: 'Pour combien de jours?',
      budgetLabel: 'Budget',
      budgetDesc: 'Quel type d\'expérience?',
      generate: 'Générer message',
      copy: 'Copier',
      categories: { 'Night Club': 'Club de nuit', 'Beach Club': 'Club de plage', 'Restaurant': 'Restaurant', 'Boat Party': 'Fête en bateau', 'Service': 'Service', 'Beach': 'Plage' },
      serviceTypes: { jetski: 'Jetski', boat: 'Location bateau', car: 'Voiture', scooter: 'Scooter', atv: 'ATV', transfer: 'Transfert', restaurant: 'Restaurant' },
      beachClubs: 'Clubs de plage',
      nightClubs: 'Boîtes de nuit',
      restaurants: 'Restaurants',
      extras: 'Extras (locations, transfert, sports)',
      backToHome: '← Retour à l\'accueil',
      filterCat: 'Filtrer par catégorie',
      filterVenue: 'Filtrer par lieu',
      all: 'Tous'
    },
    es: {
      explore: '📅 Eventos',
      planning: '✍️ Planificación',
      services: '🏖️ Lugares & Servicios',
      name: 'Nombre completo',
      nameDesc: '¿Cómo te llamo?',
      group: 'Número de personas',
      groupDesc: '¿Cuántos sois?',
      arrival: 'Fecha de llegada',
      arrivalDesc: '¿Cuándo llegas a Mykonos?',
      days: 'Días de estancia',
      daysDesc: '¿Cuántos días?',
      budgetLabel: 'Presupuesto',
      budgetDesc: '¿Qué tipo de experiencia?',
      generate: 'Generar mensaje',
      copy: 'Copiar',
      categories: { 'Night Club': 'Discoteca', 'Beach Club': 'Club de playa', 'Restaurant': 'Restaurante', 'Boat Party': 'Fiesta en barco', 'Service': 'Servicio', 'Beach': 'Playa' },
      serviceTypes: { jetski: 'Moto acuática', boat: 'Alquiler de barco', car: 'Coche', scooter: 'Scooter', atv: 'ATV', transfer: 'Traslado', restaurant: 'Restaurante' },
      beachClubs: 'Clubes de playa',
      nightClubs: 'Discotecas',
      restaurants: 'Restaurantes',
      extras: 'Extras (alquileres, traslado, deportes)',
      backToHome: '← Volver al inicio',
      filterCat: 'Filtrar por categoría',
      filterVenue: 'Filtrar por lugar',
      all: 'Todos'
    }
  };
  const t = translations[lang] || translations.it;

  // Raggruppa eventi per mese
  const groupEventsByMonth = (eventsList) => {
    const groups = {};
    eventsList.forEach(ev => {
      const date = new Date(ev.date);
      const monthYear = date.toLocaleString(lang, { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(ev);
    });
    return groups;
  };

  // Validazione form planning
  const validateForm = () => {
    let err = {};
    if (!formData.name.trim()) err.name = true;
    if (!formData.groupSize || formData.groupSize < 1) err.groupSize = true;
    if (!formData.arrivalDate) err.arrivalDate = true;
    let days = formData.stayDays === 'custom' ? formData.customDays : formData.stayDays;
    if (!days || days <= 0) err.stayDays = true;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleGenerate = () => {
    if (!validateForm()) return;
    let days = formData.stayDays === 'custom' ? formData.customDays : formData.stayDays;
    const msg = `🏝️ *Mykonos Plan* 🏝️
━━━━━━━━━━━━━━━━━━
👤 *Nome:* ${formData.name}
👥 *Persone:* ${formData.groupSize}
📅 *Arrivo:* ${formData.arrivalDate}
⏱️ *Soggiorno:* ${days} giorni
💰 *Budget:* ${formData.budget === 'luxury' ? 'Lusso' : formData.budget === 'mid' ? 'Mid Range' : 'Budget'}

🔹 *I miei interessi:* beach club, ristoranti, night club, noleggi, boat party, transfer.
🙏 Puoi consigliarmi un itinerario personalizzato? Grazie!`;
    setGeneratedMsg(msg);
  };

  // Unici venue per filtro
  const uniqueVenues = [...new Set(events.map(ev => ev.venue).filter(Boolean))];
  const filteredEvents = events.filter(ev => {
    if (filterCategory !== 'all' && ev.category !== filterCategory) return false;
    if (filterVenue !== 'all' && ev.venue !== filterVenue) return false;
    return true;
  });

  // Dati statici servizi
  const servicesData = {
    beachClubs: ['Scorpios', 'Nammos', 'Principote', 'SantAnna', 'Kalua', 'Anios', 'Super Paradise', 'Tropicana'],
    nightClubs: ['Cavo Paradiso', 'Alemagou', 'Interni', 'Void', 'Monastery'],
    restaurants: ['Carosello (Dinner Show)', 'Cavotagoo Chef\'s Table', 'Interni Restaurant', 'Thalas', 'Ling Ling'],
    extras: ['Jetski', 'Flyboard', 'Parasailing', 'Boat rental (RIB)', 'Private cruise', 'ATV/Quad', 'Scooter rental', 'Car rental', 'Water taxi']
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      {/* Barra lingua e tema */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['it','en','fr','es'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            background: lang === l ? '#1e2a3e' : darkMode ? '#2d3748' : 'white',
            color: lang === l ? 'white' : darkMode ? '#e2e8f0' : '#1e2a3e',
            border: '1px solid #ccc', borderRadius: 30, padding: '6px 12px', cursor: 'pointer'
          }}>{l.toUpperCase()}</button>
        ))}
        <button onClick={toggleDark} style={{
          background: '#1e2a3e', color: 'white', border: 'none', borderRadius: 30,
          padding: '6px 12px', cursor: 'pointer'
        }}>{darkMode ? '☀️' : '🌙'}</button>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #1e2a3e, #2c3e4e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🏝️ Mykonos Promoter</h1>
        <p style={{ color: darkMode ? '#a0aec0' : '#4a5568' }}>Il tuo assistente personale per una vacanza da sogno</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
        {['explore','planning','services'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: activeTab === tab ? '#1e2a3e' : darkMode ? '#2d3748' : '#e2e8f0',
            color: activeTab === tab ? 'white' : darkMode ? '#e2e8f0' : '#1e2a3e',
            padding: '12px 28px', borderRadius: 40, border: 'none', fontWeight: 'bold', cursor: 'pointer'
          }}>
            {tab === 'explore' && t.explore}
            {tab === 'planning' && t.planning}
            {tab === 'services' && t.services}
          </button>
        ))}
      </div>

      {/* EXPLORE con filtri */}
      {activeTab === 'explore' && (
        <div style={{ background: darkMode ? '#1e2a3e' : 'white', borderRadius: 28, padding: 24, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>📆 Calendario eventi</h2>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{
              padding: 8, borderRadius: 20, background: darkMode ? '#2d3748' : 'white',
              color: darkMode ? '#e2e8f0' : '#1e2a3e', border: '1px solid #ccc'
            }}>
              <option value="all">{t.all} categorie</option>
              <option value="Night Club">{t.categories['Night Club']}</option>
              <option value="Beach Club">{t.categories['Beach Club']}</option>
              <option value="Restaurant">{t.categories['Restaurant']}</option>
              <option value="Boat Party">{t.categories['Boat Party']}</option>
            </select>
            <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={{
              padding: 8, borderRadius: 20, background: darkMode ? '#2d3748' : 'white',
              color: darkMode ? '#e2e8f0' : '#1e2a3e', border: '1px solid #ccc'
            }}>
              <option value="all">{t.all} locali</option>
              {uniqueVenues.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          {filteredEvents.length === 0 ? <p>Nessun evento trovato.</p> : (
            (() => {
              const sorted = [...filteredEvents].sort((a,b)=>new Date(a.date)-new Date(b.date));
              const grouped = groupEventsByMonth(sorted);
              return Object.keys(grouped).map(month => (
                <div key={month} style={{ marginBottom: 30 }}>
                  <h3 style={{ fontSize: '1.5rem', borderLeft: '4px solid #1e2a3e', paddingLeft: 12, marginBottom: 16, color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>{month}</h3>
                  {grouped[month].map(ev => (
                    <div key={ev.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
                      <span style={{ fontWeight: 'bold', minWidth: 100, color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>{ev.date}</span>
                      <span style={{ flex: 2, margin: '0 12px', color: darkMode ? '#cbd5e0' : '#2d3748' }}>{ev.name}</span>
                      <span style={{ minWidth: 120, color: darkMode ? '#a0aec0' : '#4a5568' }}>{ev.venue}</span>
                      <span style={{ background: darkMode ? '#2d3748' : '#e9ecef', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>{t.categories[ev.category] || ev.category}</span>
                    </div>
                  ))}
                </div>
              ));
            })()
          )}
        </div>
      )}

      {/* PLANNING */}
      {activeTab === 'planning' && (
        <div style={{ background: darkMode ? '#1e2a3e' : 'white', borderRadius: 28, padding: 24, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
          <h2>✍️ {lang === 'it' ? 'Crea il tuo programma' : lang === 'en' ? 'Create your program' : lang === 'fr' ? 'Créez votre programme' : 'Crea tu programa'}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
            {/* Nome */}
            <div><label style={{ fontWeight: 'bold' }}>{t.name}</label><small style={{ display: 'block', color: '#64748b' }}>{t.nameDesc}</small><input type="text" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} style={{ width: '100%', padding: 12, borderRadius: 16, border: errors.name ? '2px solid #e74c3c' : '1px solid #cbd5e0', background: darkMode ? '#2d3748' : 'white', color: darkMode ? '#e2e8f0' : '#1e2a3e' }} /></div>
            {/* Persone */}
            <div><label style={{ fontWeight: 'bold' }}>{t.group}</label><small style={{ display: 'block', color: '#64748b' }}>{t.groupDesc}</small><input type="number" min="1" value={formData.groupSize} onChange={e=>setFormData({...formData,groupSize:parseInt(e.target.value)||1})} style={{ width: '100%', padding: 12, borderRadius: 16, border: errors.groupSize ? '2px solid #e74c3c' : '1px solid #cbd5e0', background: darkMode ? '#2d3748' : 'white', color: darkMode ? '#e2e8f0' : '#1e2a3e' }} /></div>
            {/* Data arrivo */}
            <div><label style={{ fontWeight: 'bold' }}>{t.arrival}</label><small style={{ display: 'block', color: '#64748b' }}>{t.arrivalDesc}</small><input type="date" value={formData.arrivalDate} onChange={e=>setFormData({...formData,arrivalDate:e.target.value})} style={{ width: '100%', padding: 12, borderRadius: 16, border: errors.arrivalDate ? '2px solid #e74c3c' : '1px solid #cbd5e0', background: darkMode ? '#2d3748' : 'white', color: darkMode ? '#e2e8f0' : '#1e2a3e' }} /></div>
            {/* Giorni */}
            <div><label style={{ fontWeight: 'bold' }}>{t.days}</label><small style={{ display: 'block', color: '#64748b' }}>{t.daysDesc}</small><select value={formData.stayDays} onChange={e=>setFormData({...formData,stayDays:e.target.value})} style={{ width: '100%', padding: 12, borderRadius: 16, border: errors.stayDays ? '2px solid #e74c3c' : '1px solid #cbd5e0', background: darkMode ? '#2d3748' : 'white', color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>
                <option value="3">3</option><option value="5">5</option><option value="7">7</option><option value="10">10</option><option value="14">14</option><option value="custom">Custom</option>
              </select>
              {formData.stayDays === 'custom' && <input type="number" placeholder="#" value={formData.customDays} onChange={e=>setFormData({...formData,customDays:e.target.value})} style={{ width: '100%', marginTop: 10, padding: 12, borderRadius: 16, background: darkMode ? '#2d3748' : 'white', color: darkMode ? '#e2e8f0' : '#1e2a3e' }} />}
            </div>
            {/* Budget */}
            <div><label style={{ fontWeight: 'bold' }}>{t.budgetLabel}</label><small style={{ display: 'block', color: '#64748b' }}>{t.budgetDesc}</small><select value={formData.budget} onChange={e=>setFormData({...formData,budget:e.target.value})} style={{ width: '100%', padding: 12, borderRadius: 16, background: darkMode ? '#2d3748' : 'white', color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>
              <option value="luxury">💰 Luxury</option><option value="mid">💵 Mid Range</option><option value="budget">🟢 Budget</option>
            </select></div>
            <button onClick={handleGenerate} style={{ background: '#1e2a3e', color: 'white', padding: '14px', borderRadius: 40, border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{t.generate}</button>
            {generatedMsg && (
              <div style={{ marginTop: 20, background: darkMode ? '#2d3748' : '#f1f5f9', padding: 20, borderRadius: 20, whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: darkMode ? '#e2e8f0' : '#1e2a3e' }}>
                {generatedMsg}
                <button onClick={()=>{navigator.clipboard.writeText(generatedMsg); alert('Copiato!');}} style={{ marginTop: 10, background: '#2c7a47', color: 'white', padding: '8px 16px', borderRadius: 40, border: 'none' }}>{t.copy}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SERVICES */}
      {activeTab === 'services' && (
        <div style={{ background: darkMode ? '#1e2a3e' : 'white', borderRadius: 28, padding: 24, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
          <h2>🏛️ {lang === 'it' ? 'Scopri Mykonos' : lang === 'en' ? 'Discover Mykonos' : lang === 'fr' ? 'Découvrez Mykonos' : 'Descubre Mykonos'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: 24, marginTop: 24 }}>
            <div><h3>🏖️ {t.beachClubs}</h3><ul>{servicesData.beachClubs.map(c => <li key={c} style={{ marginBottom: 8 }}>🌊 {c}</li>)}</ul></div>
            <div><h3>🎧 {t.nightClubs}</h3><ul>{servicesData.nightClubs.map(c => <li key={c} style={{ marginBottom: 8 }}>🎵 {c}</li>)}</ul></div>
            <div><h3>🍽️ {t.restaurants}</h3><ul>{servicesData.restaurants.map(c => <li key={c} style={{ marginBottom: 8 }}>🍴 {c}</li>)}</ul></div>
            <div><h3>⚡ {t.extras}</h3><ul>{servicesData.extras.map(c => <li key={c} style={{ marginBottom: 8 }}>🚤 {c}</li>)}</ul></div>
          </div>
          <p style={{ marginTop: 24, color: darkMode ? '#a0aec0' : '#64748b', fontSize: '0.9rem', textAlign: 'center' }}>💡 Per prenotazioni e disponibilità, contattami su WhatsApp!</p>
        </div>
      )}
    </div>
  );
}
