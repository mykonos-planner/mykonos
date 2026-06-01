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
    document.body.style.backgroundColor = savedDark ? '#0f172a' : '#fef9e8'; // sabbia chiaro
    document.body.style.color = savedDark ? '#e2e8f0' : '#2d3e50';
  }, []);

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem('darkMode', newDark);
    document.body.style.backgroundColor = newDark ? '#0f172a' : '#fef9e8';
    document.body.style.color = newDark ? '#e2e8f0' : '#2d3e50';
  };

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
      subtitle: 'Il tuo assistente personale per una vacanza da sogno',
      beachClubs: 'Beach Club',
      nightClubs: 'Night Club',
      restaurants: 'Ristoranti',
      extras: 'Extra',
      filterCat: 'Filtra per categoria',
      filterVenue: 'Filtra per locale',
      all: 'Tutti',
      day: 'Giorno',
      morning: 'Mattina / Spiaggia',
      lunch: 'Pranzo',
      evening: 'Serata / Musica'
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
      subtitle: 'Your personal assistant for a dream vacation',
      beachClubs: 'Beach Clubs',
      nightClubs: 'Night Clubs',
      restaurants: 'Restaurants',
      extras: 'Extras',
      filterCat: 'Filter by category',
      filterVenue: 'Filter by venue',
      all: 'All',
      day: 'Day',
      morning: 'Morning / Beach',
      lunch: 'Lunch',
      evening: 'Evening / Music'
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
      subtitle: 'Votre assistant personnel pour des vacances de rêve',
      beachClubs: 'Clubs de plage',
      nightClubs: 'Boîtes de nuit',
      restaurants: 'Restaurants',
      extras: 'Extras',
      filterCat: 'Filtrer par catégorie',
      filterVenue: 'Filtrer par lieu',
      all: 'Tous',
      day: 'Jour',
      morning: 'Matin / Plage',
      lunch: 'Déjeuner',
      evening: 'Soirée / Musique'
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
      subtitle: 'Tu asistente personal para unas vacaciones de ensueño',
      beachClubs: 'Clubes de playa',
      nightClubs: 'Discotecas',
      restaurants: 'Restaurantes',
      extras: 'Extras',
      filterCat: 'Filtrar por categoría',
      filterVenue: 'Filtrar por lugar',
      all: 'Todos',
      day: 'Día',
      morning: 'Mañana / Playa',
      lunch: 'Almuerzo',
      evening: 'Noche / Música'
    }
  };
  const t = translations[lang] || translations.it;

  // Funzione per capitalizzare la prima lettera di ogni parola del mese
  const capitalizeMonth = (monthStr) => {
    return monthStr.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const groupEventsByMonth = (eventsList) => {
    const groups = {};
    eventsList.forEach(ev => {
      if (!ev.date) return;
      const date = new Date(ev.date);
      let monthYear = date.toLocaleString(lang, { month: 'long', year: 'numeric' });
      monthYear = capitalizeMonth(monthYear);
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(ev);
    });
    return groups;
  };

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

  // Logica per generare itinerario giornaliero
  const generateItinerary = () => {
    let daysCount = formData.stayDays === 'custom' ? parseInt(formData.customDays) : parseInt(formData.stayDays);
    if (isNaN(daysCount) || daysCount < 1) daysCount = 7;
    const arrivalDate = new Date(formData.arrivalDate);
    if (isNaN(arrivalDate)) return [];

    const budgetLevel = formData.budget; // 'budget', 'mid', 'luxury'
    // Filtra eventi nel periodo
    const endDate = new Date(arrivalDate);
    endDate.setDate(arrivalDate.getDate() + daysCount - 1);
    const eventsInPeriod = events.filter(ev => {
      if (!ev.date) return false;
      const evDate = new Date(ev.date);
      return evDate >= arrivalDate && evDate <= endDate;
    });

    // Seleziona casualmente (o meglio, in base alla data) per ogni giorno
    // Per semplicità: per ogni giorno, scegli un evento musicale (Night Club o Beach Club con data),
    // un ristorante (eventi categoria Restaurant) e una spiaggia/extra (Beach o Service)
    const musicEvents = eventsInPeriod.filter(ev => ev.category === 'Night Club' || ev.category === 'Beach Club');
    const restaurants = eventsInPeriod.filter(ev => ev.category === 'Restaurant');
    const beaches = events.filter(ev => ev.type === 'beach'); // senza data, statici
    const extras = events.filter(ev => ev.type === 'extra');

    // Funzione per filtrare per budget (se presente)
    const filterByBudget = (list) => {
      if (!list || list.length === 0) return [];
      if (budgetLevel === 'luxury') return list;
      if (budgetLevel === 'mid') return list.filter(item => item.budget !== 'luxury');
      return list.filter(item => item.budget === 'budget');
    };

    const availableMusic = filterByBudget(musicEvents);
    const availableRestaurants = filterByBudget(restaurants);
    const availableBeaches = filterByBudget(beaches);
    const availableExtras = filterByBudget(extras);

    const itinerary = [];
    for (let i = 0; i < daysCount; i++) {
      const currentDate = new Date(arrivalDate);
      currentDate.setDate(arrivalDate.getDate() + i);
      const dateStr = currentDate.toISOString().slice(0,10);
      // Scegli un evento musicale per questo giorno (se esiste)
      const musicForDay = availableMusic.find(ev => ev.date === dateStr) || 
                          (availableMusic.length ? availableMusic[i % availableMusic.length] : null);
      // Ristorante: cerca se c'è un ristorante con data quel giorno, altrimenti random
      const restaurantForDay = availableRestaurants.find(ev => ev.date === dateStr) ||
                               (availableRestaurants.length ? availableRestaurants[i % availableRestaurants.length] : null);
      // Spiaggia: random tra le spiagge disponibili (o extra)
      const beachForDay = availableBeaches.length ? availableBeaches[i % availableBeaches.length] : null;
      const extraForDay = (!beachForDay && availableExtras.length) ? availableExtras[i % availableExtras.length] : null;
      const morningActivity = beachForDay ? beachForDay.name : (extraForDay ? extraForDay.name : 'Giornata libera');
      itinerary.push({
        day: i+1,
        date: dateStr,
        morning: morningActivity,
        lunch: restaurantForDay ? restaurantForDay.name : 'Consiglia un ristorante tipico',
        evening: musicForDay ? `${musicForDay.name} @ ${musicForDay.venue || 'locale'}` : 'Serata libera'
      });
    }
    return itinerary;
  };

  const handleGenerate = () => {
    if (!validateForm()) return;
    let daysCount = formData.stayDays === 'custom' ? formData.customDays : formData.stayDays;
    if (!daysCount) daysCount = 7;
    const itinerary = generateItinerary();
    let msg = `🏝️ MYKONOS PLANNING - ${formData.name}\n`;
    msg += `Persone: ${formData.groupSize} | Arrivo: ${formData.arrivalDate} | Soggiorno: ${daysCount} giorni | Budget: ${formData.budget === 'luxury' ? 'Lusso' : formData.budget === 'mid' ? 'Mid Range' : 'Budget'}\n\n`;
    itinerary.forEach(day => {
      msg += `📅 Giorno ${day.day} (${day.date})\n`;
      msg += `☀️ Mattina: ${day.morning}\n`;
      msg += `🍽️ Pranzo: ${day.lunch}\n`;
      msg += `🌙 Serata: ${day.evening}\n\n`;
    });
    setGeneratedMsg(msg);
  };

  const uniqueVenues = [...new Set(events.map(ev => ev.venue).filter(Boolean))];
  const filteredEvents = events.filter(ev => {
    if (filterCategory !== 'all' && ev.category !== filterCategory) return false;
    if (filterVenue !== 'all' && ev.venue !== filterVenue) return false;
    return true;
  });

  // Dati statici per la sezione servizi (migliorati graficamente)
  const servicesData = {
    beachClubs: ['Scorpios', 'Nammos', 'Principote', 'SantAnna', 'Kalua', 'Anios', 'Super Paradise', 'Tropicana'],
    nightClubs: ['Cavo Paradiso', 'Alemagou', 'Interni', 'Void', 'Monastery'],
    restaurants: ['Carosello (Dinner Show)', 'Cavotagoo Chef\'s Table', 'Interni Restaurant', 'Thalas', 'Ling Ling'],
    extras: ['Jetski', 'Flyboard', 'Parasailing', 'Boat rental (RIB)', 'Private cruise', 'ATV/Quad', 'Scooter rental', 'Car rental', 'Water taxi']
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Barra lingua + tema */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['it','en','fr','es'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            background: lang === l ? '#0ea5e9' : darkMode ? '#1e293b' : 'white',
            color: lang === l ? 'white' : darkMode ? '#e2e8f0' : '#2d3e50',
            border: 'none', borderRadius: '40px', padding: '6px 16px', cursor: 'pointer', fontWeight: lang === l ? 'bold' : 'normal'
          }}>{l.toUpperCase()}</button>
        ))}
        <button onClick={toggleDark} style={{
          background: '#1e2a3e', color: 'white', border: 'none', borderRadius: '40px', padding: '6px 16px', cursor: 'pointer'
        }}>{darkMode ? '☀️' : '🌙'}</button>
      </div>

      {/* Header con nuovo nome e sottotitolo tradotto */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>🏝️ Mykonos Planning</h1>
        <p style={{ color: darkMode ? '#94a3b8' : '#5a6e7c' }}>{t.subtitle}</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {['explore','planning','services'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: activeTab === tab ? '#0ea5e9' : darkMode ? '#1e293b' : 'white',
            color: activeTab === tab ? 'white' : darkMode ? '#e2e8f0' : '#2d3e50',
            border: 'none', padding: '10px 24px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
          }}>
            {tab === 'explore' && t.explore}
            {tab === 'planning' && t.planning}
            {tab === 'services' && t.services}
          </button>
        ))}
      </div>

      {/* EXPLORE - versione più dinamica con card hover */}
      {activeTab === 'explore' && (
        <div style={{ background: darkMode ? '#1e293b' : 'white', borderRadius: '28px', padding: '24px', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '20px', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>📆 {lang === 'it' ? 'Calendario eventi' : lang === 'en' ? 'Event Calendar' : lang === 'fr' ? 'Calendrier des événements' : 'Calendario de eventos'}</h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ padding: '8px 16px', borderRadius: '40px', background: darkMode ? '#0f172a' : '#fef9e8', border: `1px solid ${darkMode ? '#475569' : '#d4c9b0'}`, color: darkMode ? '#e2e8f0' : '#2d3e50' }}>
              <option value="all">{t.all} categorie</option>
              <option value="Night Club">{t.categories['Night Club']}</option>
              <option value="Beach Club">{t.categories['Beach Club']}</option>
              <option value="Restaurant">{t.categories['Restaurant']}</option>
              <option value="Boat Party">{t.categories['Boat Party']}</option>
            </select>
            <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={{ padding: '8px 16px', borderRadius: '40px', background: darkMode ? '#0f172a' : '#fef9e8', border: `1px solid ${darkMode ? '#475569' : '#d4c9b0'}`, color: darkMode ? '#e2e8f0' : '#2d3e50' }}>
              <option value="all">{t.all} locali</option>
              {uniqueVenues.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          {filteredEvents.length === 0 ? (
            <p style={{ textAlign: 'center', color: darkMode ? '#94a3b8' : '#5a6e7c' }}>Nessun evento trovato.</p>
          ) : (
            (() => {
              const sorted = [...filteredEvents].sort((a,b)=>new Date(a.date)-new Date(b.date));
              const grouped = groupEventsByMonth(sorted);
              return Object.keys(grouped).map(month => (
                <div key={month} style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.6rem', borderLeft: `4px solid #0ea5e9`, paddingLeft: '12px', marginBottom: '20px', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{month}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                    {grouped[month].map(ev => (
                      <div key={ev.id} style={{
                        background: darkMode ? '#0f172a' : '#fef9e8',
                        borderRadius: '20px',
                        padding: '16px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer',
                        border: `1px solid ${darkMode ? '#334155' : '#e6dfd0'}`
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)'; }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{ev.date}</div>
                        <div style={{ fontSize: '1rem', marginTop: '6px', color: darkMode ? '#cbd5e0' : '#4a627a' }}>{ev.name}</div>
                        <div style={{ fontSize: '0.9rem', marginTop: '4px', color: darkMode ? '#94a3b8' : '#6b8cae' }}>{ev.venue}</div>
                        <div style={{ marginTop: '10px' }}><span style={{ background: darkMode ? '#1e293b' : '#e9ecef', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{t.categories[ev.category] || ev.category}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()
          )}
        </div>
      )}

      {/* PLANNING - invariato ma con nuova generazione messaggio */}
      {activeTab === 'planning' && (
        <div style={{ background: darkMode ? '#1e293b' : 'white', borderRadius: '28px', padding: '24px', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: darkMode ? '#e2e8f0' : '#2d3e50' }}>✍️ {lang === 'it' ? 'Crea il tuo programma' : lang === 'en' ? 'Create your program' : lang === 'fr' ? 'Créez votre programme' : 'Crea tu programa'}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            {/* Campi del form... stesso codice di prima ma con i nuovi stili */}
            <div><label style={{ fontWeight: 'bold', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{t.name}</label><small style={{ display: 'block', color: darkMode ? '#94a3b8' : '#5a6e7c' }}>{t.nameDesc}</small><input type="text" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} style={inputStyle(darkMode, errors.name)} /></div>
            <div><label style={{ fontWeight: 'bold', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{t.group}</label><small style={{ display: 'block', color: darkMode ? '#94a3b8' : '#5a6e7c' }}>{t.groupDesc}</small><input type="number" min="1" value={formData.groupSize} onChange={e=>setFormData({...formData,groupSize:parseInt(e.target.value)||1})} style={inputStyle(darkMode, errors.groupSize)} /></div>
            <div><label style={{ fontWeight: 'bold', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{t.arrival}</label><small style={{ display: 'block', color: darkMode ? '#94a3b8' : '#5a6e7c' }}>{t.arrivalDesc}</small><input type="date" value={formData.arrivalDate} onChange={e=>setFormData({...formData,arrivalDate:e.target.value})} style={inputStyle(darkMode, errors.arrivalDate)} /></div>
            <div><label style={{ fontWeight: 'bold', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{t.days}</label><small style={{ display: 'block', color: darkMode ? '#94a3b8' : '#5a6e7c' }}>{t.daysDesc}</small><select value={formData.stayDays} onChange={e=>setFormData({...formData,stayDays:e.target.value})} style={selectStyle(darkMode, errors.stayDays)}>
              <option value="3">3</option><option value="5">5</option><option value="7">7</option><option value="10">10</option><option value="14">14</option><option value="custom">Custom</option>
            </select>
            {formData.stayDays === 'custom' && <input type="number" placeholder="#" value={formData.customDays} onChange={e=>setFormData({...formData,customDays:e.target.value})} style={{ ...inputStyle(darkMode, false), marginTop: '10px' }} />}</div>
            <div><label style={{ fontWeight: 'bold', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>{t.budgetLabel}</label><small style={{ display: 'block', color: darkMode ? '#94a3b8' : '#5a6e7c' }}>{t.budgetDesc}</small><select value={formData.budget} onChange={e=>setFormData({...formData,budget:e.target.value})} style={selectStyle(darkMode, false)}>
              <option value="luxury">💰 Luxury</option><option value="mid">💵 Mid Range</option><option value="budget">🟢 Budget</option>
            </select></div>
            <button onClick={handleGenerate} style={{ background: '#0ea5e9', color: 'white', border: 'none', padding: '14px', borderRadius: '48px', fontWeight: 'bold', cursor: 'pointer' }}>{t.generate}</button>
            {generatedMsg && (
              <div style={{ marginTop: '20px', background: darkMode ? '#0f172a' : '#fef9e8', padding: '20px', borderRadius: '24px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: darkMode ? '#e2e8f0' : '#2d3e50' }}>
                {generatedMsg}
                <button onClick={()=>{navigator.clipboard.writeText(generatedMsg); alert('Copiato!');}} style={{ marginTop: '12px', background: '#0ea5e9', color: 'white', padding: '8px 20px', borderRadius: '40px', border: 'none', cursor: 'pointer' }}>{t.copy}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SERVICES - versione migliorata con card */}
      {activeTab === 'services' && (
        <div style={{ background: darkMode ? '#1e293b' : 'white', borderRadius: '28px', padding: '24px', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: darkMode ? '#e2e8f0' : '#2d3e50' }}>🏛️ {lang === 'it' ? 'Scopri Mykonos' : lang === 'en' ? 'Discover Mykonos' : lang === 'fr' ? 'Découvrez Mykonos' : 'Descubre Mykonos'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '24px', marginTop: '24px' }}>
            {Object.entries({
              beachClubs: { title: t.beachClubs, icon: '🏖️', data: servicesData.beachClubs, color: '#0ea5e9' },
              nightClubs: { title: t.nightClubs, icon: '🎧', data: servicesData.nightClubs, color: '#8b5cf6' },
              restaurants: { title: t.restaurants, icon: '🍽️', data: servicesData.restaurants, color: '#10b981' },
              extras: { title: t.extras, icon: '⚡', data: servicesData.extras, color: '#f59e0b' }
            }).map(([key, section]) => (
              <div key={key} style={{ background: darkMode ? '#0f172a' : '#fef9e8', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}>
                <h3 style={{ color: darkMode ? '#e2e8f0' : '#2d3e50', borderBottom: `2px solid ${section.color}`, paddingBottom: '8px', display: 'inline-block' }}>{section.icon} {section.title}</h3>
                <ul style={{ marginTop: '16px', listStyle: 'none', paddingLeft: 0 }}>
                  {section.data.map((item, idx) => <li key={idx} style={{ marginBottom: '10px', padding: '4px 0', borderBottom: darkMode ? '1px solid #334155' : '1px solid #e6dfd0', color: darkMode ? '#cbd5e0' : '#4a627a' }}>✨ {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '32px', color: darkMode ? '#94a3b8' : '#5a6e7c', fontSize: '0.9rem', textAlign: 'center' }}>💡 Per prenotazioni e disponibilità, contattami su WhatsApp!</p>
        </div>
      )}
    </div>
  );
}

// Stili riutilizzabili
const inputStyle = (darkMode, hasError) => ({
  width: '100%', padding: '12px', borderRadius: '48px', border: hasError ? '2px solid #ef4444' : `1px solid ${darkMode ? '#475569' : '#d4c9b0'}`, background: darkMode ? '#0f172a' : 'white', color: darkMode ? '#e2e8f0' : '#2d3e50', fontSize: '1rem'
});

const selectStyle = (darkMode, hasError) => ({
  width: '100%', padding: '12px', borderRadius: '48px', border: hasError ? '2px solid #ef4444' : `1px solid ${darkMode ? '#475569' : '#d4c9b0'}`, background: darkMode ? '#0f172a' : 'white', color: darkMode ? '#e2e8f0' : '#2d3e50', fontSize: '1rem'
});
