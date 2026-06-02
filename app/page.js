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
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextTab, setNextTab] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data.events || []));
    const savedDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDark);
    updateBodyTheme(savedDark);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateBodyTheme = (isDark) => {
    if (isDark) {
      document.body.style.backgroundColor = '#0B131F';
      document.body.style.color = '#E6EDF5';
    } else {
      document.body.style.backgroundColor = '#EAF7FA';   // acqua limpida
      document.body.style.color = '#3E4A5B';            // pietra
    }
  };

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem('darkMode', newDark);
    updateBodyTheme(newDark);
  };

  const changeTab = (newTab) => {
    if (newTab === activeTab) return;
    setIsTransitioning(true);
    setNextTab(newTab);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 200);
  };

  // Traduzioni (stesse di prima)
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
      generate: 'Genera itinerario',
      copy: 'Copia',
      subtitle: 'Il tuo assistente personale per una vacanza da sogno',
      categories: { 'Night Club': 'Night Club', 'Beach Club': 'Beach Club', 'Restaurant': 'Ristorante', 'Boat Party': 'Boat Party', 'Service': 'Servizio', 'Beach': 'Spiaggia' },
      beachClubs: 'Beach Club',
      nightClubs: 'Night Club',
      restaurants: 'Ristoranti',
      extras: 'Extra (noleggi, sport, transfer)',
      filterCat: 'Filtra per categoria',
      filterVenue: 'Filtra per locale',
      all: 'Tutti',
      dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      morningLabel: 'Mattina/Pomeriggio',
      mealLabel: 'Pranzo/Cena',
      eveningLabel: 'Serata',
      extraLabel: 'Extra'
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
      generate: 'Generate itinerary',
      copy: 'Copy',
      subtitle: 'Your personal assistant for a dream vacation',
      categories: { 'Night Club': 'Night Club', 'Beach Club': 'Beach Club', 'Restaurant': 'Restaurant', 'Boat Party': 'Boat Party', 'Service': 'Service', 'Beach': 'Beach' },
      beachClubs: 'Beach Clubs',
      nightClubs: 'Night Clubs',
      restaurants: 'Restaurants',
      extras: 'Extras (rentals, sports, transfer)',
      filterCat: 'Filter by category',
      filterVenue: 'Filter by venue',
      all: 'All',
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      morningLabel: 'Morning/Afternoon',
      mealLabel: 'Lunch/Dinner',
      eveningLabel: 'Evening',
      extraLabel: 'Extra'
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
      generate: 'Générer itinéraire',
      copy: 'Copier',
      subtitle: 'Votre assistant personnel pour des vacances de rêve',
      categories: { 'Night Club': 'Club de nuit', 'Beach Club': 'Club de plage', 'Restaurant': 'Restaurant', 'Boat Party': 'Fête en bateau', 'Service': 'Service', 'Beach': 'Plage' },
      beachClubs: 'Clubs de plage',
      nightClubs: 'Boîtes de nuit',
      restaurants: 'Restaurants',
      extras: 'Extras (locations, sports, transfert)',
      filterCat: 'Filtrer par catégorie',
      filterVenue: 'Filtrer par lieu',
      all: 'Tous',
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      morningLabel: 'Matin/Après-midi',
      mealLabel: 'Déjeuner/Dîner',
      eveningLabel: 'Soirée',
      extraLabel: 'Extra'
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
      generate: 'Generar itinerario',
      copy: 'Copiar',
      subtitle: 'Tu asistente personal para unas vacaciones de ensueño',
      categories: { 'Night Club': 'Discoteca', 'Beach Club': 'Club de playa', 'Restaurant': 'Restaurante', 'Boat Party': 'Fiesta en barco', 'Service': 'Servicio', 'Beach': 'Playa' },
      beachClubs: 'Clubes de playa',
      nightClubs: 'Discotecas',
      restaurants: 'Restaurantes',
      extras: 'Extras (alquileres, deportes, traslado)',
      filterCat: 'Filtrar por categoría',
      filterVenue: 'Filtrar por lugar',
      all: 'Todos',
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      morningLabel: 'Mañana/Tarde',
      mealLabel: 'Comida/Cena',
      eveningLabel: 'Noche',
      extraLabel: 'Extra'
    }
  };
  const t = translations[lang] || translations.it;

  const capitalizeMonth = (monthStr) => monthStr.charAt(0).toUpperCase() + monthStr.slice(1);

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

  const generateItinerary = () => {
    if (!validateForm()) return;
    let days = parseInt(formData.stayDays === 'custom' ? formData.customDays : formData.stayDays);
    if (isNaN(days)) days = 7;
    const startDate = new Date(formData.arrivalDate);
    const budgetLevel = formData.budget;

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days - 1);
    const eventsInRange = events.filter(ev => {
      if (!ev.date) return false;
      const evDate = new Date(ev.date);
      return evDate >= startDate && evDate <= endDate;
    });

    const musicEvents = eventsInRange.filter(ev => ev.category === 'Night Club' || ev.type === 'event');
    const restaurantsList = events.filter(ev => ev.category === 'Restaurant' || ev.type === 'restaurant');
    const beachesList = events.filter(ev => ev.category === 'Beach' || ev.type === 'beach');
    const extrasList = events.filter(ev => ev.type === 'extra');

    const filterByBudget = (item) => {
      if (!item.budget) return true;
      if (budgetLevel === 'luxury') return item.budget === 'luxury' || item.budget === 'mid';
      if (budgetLevel === 'mid') return item.budget !== 'luxury';
      return item.budget === 'budget' || !item.budget;
    };

    let itinerary = '';
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayOfWeek = t.dayNames[currentDate.getDay()];
      const formattedDate = currentDate.toISOString().slice(0,10);
      const dayEvents = musicEvents.filter(ev => ev.date === formattedDate);
      const musicSuggestion = dayEvents.length > 0 ? dayEvents[0].name : (musicEvents.length > 0 ? musicEvents[i % musicEvents.length].name : 'Serata libera');
      
      const availableRestaurants = restaurantsList.filter(filterByBudget);
      const restaurantSuggestion = availableRestaurants.length > 0 ? availableRestaurants[i % availableRestaurants.length].name : 'Taverna locale';
      
      const availableBeaches = beachesList.filter(filterByBudget);
      const beachSuggestion = availableBeaches.length > 0 ? availableBeaches[i % availableBeaches.length].name : 'Spiaggia libera';
      
      const availableExtras = extrasList.filter(filterByBudget);
      const extraSuggestion = availableExtras.length > 0 ? availableExtras[i % availableExtras.length].name : 'Relax in hotel';
      
      itinerary += `\n📅 ${dayOfWeek} ${formattedDate}\n`;
      itinerary += `   ☀️ ${t.morningLabel}: ${beachSuggestion}\n`;
      itinerary += `   🍽️ ${t.mealLabel}: ${restaurantSuggestion}\n`;
      itinerary += `   🎧 ${t.eveningLabel}: ${musicSuggestion}\n`;
      itinerary += `   ⚡ ${t.extraLabel}: ${extraSuggestion}\n`;
    }
    
    const msg = `🏝️ MYKONOS PLANNING 🏝️\n━━━━━━━━━━━━━━━━━━\n👤 ${t.name}: ${formData.name}\n👥 ${t.group}: ${formData.groupSize}\n📅 ${t.arrival}: ${formData.arrivalDate}\n⏱️ ${t.days}: ${days}\n💰 ${t.budgetLabel}: ${formData.budget === 'luxury' ? 'Luxury' : formData.budget === 'mid' ? 'Mid Range' : 'Budget'}\n${itinerary}`;
    setGeneratedMsg(msg);
  };

  const uniqueVenues = [...new Set(events.map(ev => ev.venue).filter(Boolean))];
  const filteredEvents = events.filter(ev => {
    if (filterCategory !== 'all' && ev.category !== filterCategory) return false;
    if (filterVenue !== 'all' && ev.venue !== filterVenue) return false;
    return true;
  });

  const servicesData = {
    beachClubs: ['Scorpios', 'Nammos', 'Principote', 'SantAnna', 'Kalua', 'Anios', 'Super Paradise', 'Tropicana'],
    nightClubs: ['Cavo Paradiso', 'Alemagou', 'Interni', 'Void', 'Monastery'],
    restaurants: ['Carosello (Dinner Show)', 'Cavotagoo Chef\'s Table', 'Interni Restaurant', 'Thalas', 'Ling Ling'],
    extras: ['Jetski', 'Flyboard', 'Parasailing', 'Boat rental (RIB)', 'Private cruise', 'ATV/Quad', 'Scooter rental', 'Car rental', 'Water taxi']
  };

  const transitionStyle = {
    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'translateX(10px)' : 'translateX(0)'
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Barra lingua e tema */}
      <div style={{ 
        display: 'flex', 
        justifyContent: isMobile ? 'space-between' : 'flex-end', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '24px', 
        flexWrap: 'wrap',
        width: '100%'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          flex: isMobile ? 1 : 'none', 
          justifyContent: isMobile ? 'space-evenly' : 'flex-end', 
          flexWrap: 'wrap',
          width: isMobile ? '100%' : 'auto'
        }}>
          {['it','en','fr','es'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? (darkMode ? '#38A1F3' : '#2A9D8F') : 'transparent',
              color: lang === l ? 'white' : (darkMode ? '#E6EDF5' : '#3E4A5B'),
              border: `1px solid ${darkMode ? '#38A1F3' : '#2A9D8F'}`,
              borderRadius: '40px', 
              padding: '6px 16px', 
              cursor: 'pointer', 
              fontWeight: lang === l ? 'bold' : 'normal',
              textAlign: 'center'
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
        <button onClick={toggleDark} style={{
          background: darkMode ? '#F4A261' : '#2A9D8F', 
          color: 'white', 
          border: 'none', 
          borderRadius: '40px', 
          padding: '6px 16px', 
          cursor: 'pointer'
        }}>{darkMode ? '☀️' : '🌙'}</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: darkMode ? '#38A1F3' : '#2A9D8F',
          marginBottom: '8px'
        }}>🏝️ Mykonos Planning</h1>
        <p style={{ color: darkMode ? '#E6EDF5' : '#6B7B8D', opacity: 0.9 }}>{t.subtitle}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {['explore','planning','services'].map(tab => (
          <button key={tab} onClick={() => changeTab(tab)} style={{
            background: activeTab === tab ? (darkMode ? '#38A1F3' : '#2A9D8F') : (darkMode ? '#162235' : 'white'),
            color: activeTab === tab ? 'white' : (darkMode ? '#E6EDF5' : '#3E4A5B'),
            border: `1px solid ${darkMode ? '#38A1F3' : '#2A9D8F'}`,
            padding: '10px 24px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer'
          }}>
            {tab === 'explore' && t.explore}
            {tab === 'planning' && t.planning}
            {tab === 'services' && t.services}
          </button>
        ))}
      </div>

      <div style={transitionStyle}>
        {activeTab === 'explore' && (
          <div style={{ background: darkMode ? '#162235' : 'white', borderRadius: '28px', padding: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '20px', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>📆 {lang === 'it' ? 'Calendario eventi' : lang === 'en' ? 'Event Calendar' : lang === 'fr' ? 'Calendrier des événements' : 'Calendario de eventos'}</h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{
                padding: '8px 16px', borderRadius: '40px', background: darkMode ? '#0B131F' : '#EAF7FA', border: `1px solid ${darkMode ? '#38A1F3' : '#2A9D8F'}`, color: darkMode ? '#E6EDF5' : '#3E4A5B'
              }}>
                <option value="all">{t.all} categorie</option>
                <option value="Night Club">{t.categories['Night Club']}</option>
                <option value="Beach Club">{t.categories['Beach Club']}</option>
                <option value="Restaurant">{t.categories['Restaurant']}</option>
                <option value="Boat Party">{t.categories['Boat Party']}</option>
              </select>
              <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={{
                padding: '8px 16px', borderRadius: '40px', background: darkMode ? '#0B131F' : '#EAF7FA', border: `1px solid ${darkMode ? '#38A1F3' : '#2A9D8F'}`, color: darkMode ? '#E6EDF5' : '#3E4A5B'
              }}>
                <option value="all">{t.all} locali</option>
                {uniqueVenues.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            {filteredEvents.length === 0 ? (
              <p style={{ textAlign: 'center', color: darkMode ? '#E6EDF5' : '#6B7B8D' }}>Nessun evento trovato.</p>
            ) : (
              (() => {
                const sorted = [...filteredEvents].sort((a,b)=>new Date(a.date)-new Date(b.date));
                const grouped = groupEventsByMonth(sorted);
                return Object.keys(grouped).map(month => (
                  <div key={month} style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '1.5rem', borderLeft: `4px solid ${darkMode ? '#F4A261' : '#2A9D8F'}`, paddingLeft: '12px', marginBottom: '16px', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>{month}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '16px' }}>
                      {grouped[month].map(ev => (
                        <div key={ev.id} style={{ background: darkMode ? '#0B131F' : '#F9FCFD', borderRadius: '20px', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderBottom: `2px solid ${darkMode ? '#38A1F3' : '#2A9D8F'}` }}>
                          <div style={{ fontSize: '0.9rem', color: darkMode ? '#E6EDF5' : '#6B7B8D', fontWeight: 'bold', marginBottom: '8px' }}>{ev.date}</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: darkMode ? '#38A1F3' : '#2A9D8F', marginBottom: '6px' }}>{ev.name}</div>
                          <div style={{ color: darkMode ? '#E6EDF5' : '#3E4A5B', opacity: 0.8 }}>{ev.venue}</div>
                          <div style={{ marginTop: '8px', display: 'inline-block', background: darkMode ? '#F4A26120' : '#2A9D8F20', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', color: darkMode ? '#F4A261' : '#2A9D8F' }}>{t.categories[ev.category] || ev.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()
            )}
          </div>
        )}

        {activeTab === 'planning' && (
          <div style={{ background: darkMode ? '#162235' : 'white', borderRadius: '28px', padding: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>✍️ {lang === 'it' ? 'Crea il tuo programma' : lang === 'en' ? 'Create your program' : lang === 'fr' ? 'Créez votre programme' : 'Crea tu programa'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>{t.name}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : '#6B7B8D' }}>{t.nameDesc}</small>
                <input type="text" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} style={inputStyle(darkMode, errors.name)} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>{t.group}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : '#6B7B8D' }}>{t.groupDesc}</small>
                <input type="number" min="1" value={formData.groupSize} onChange={e=>setFormData({...formData,groupSize:parseInt(e.target.value)||1})} style={inputStyle(darkMode, errors.groupSize)} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>{t.arrival}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : '#6B7B8D' }}>{t.arrivalDesc}</small>
                <input type="date" value={formData.arrivalDate} onChange={e=>setFormData({...formData,arrivalDate:e.target.value})} style={inputStyle(darkMode, errors.arrivalDate)} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>{t.days}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : '#6B7B8D' }}>{t.daysDesc}</small>
                <select value={formData.stayDays} onChange={e=>setFormData({...formData,stayDays:e.target.value})} style={selectStyle(darkMode, errors.stayDays)}>
                  <option value="3">3</option><option value="5">5</option><option value="7">7</option><option value="10">10</option><option value="14">14</option><option value="custom">Custom</option>
                </select>
                {formData.stayDays === 'custom' && <input type="number" placeholder="#" value={formData.customDays} onChange={e=>setFormData({...formData,customDays:e.target.value})} style={{ ...inputStyle(darkMode, false), marginTop: '10px' }} />}
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>{t.budgetLabel}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : '#6B7B8D' }}>{t.budgetDesc}</small>
                <select value={formData.budget} onChange={e=>setFormData({...formData,budget:e.target.value})} style={selectStyle(darkMode, false)}>
                  <option value="luxury">💰 Luxury</option><option value="mid">💵 Mid Range</option><option value="budget">🟢 Budget</option>
                </select>
              </div>
              <button onClick={generateItinerary} style={{ background: darkMode ? '#38A1F3' : '#2A9D8F', color: 'white', border: 'none', padding: '14px', borderRadius: '48px', fontWeight: 'bold', cursor: 'pointer' }}>{t.generate}</button>
              {generatedMsg && (
                <div style={{ marginTop: '20px', background: darkMode ? '#0B131F' : '#EAF7FA', padding: '20px', borderRadius: '24px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>
                  {generatedMsg}
                  <button onClick={()=>{navigator.clipboard.writeText(generatedMsg); alert('Copiato!');}} style={{ marginTop: '12px', background: '#2A9D8F', color: 'white', padding: '8px 20px', borderRadius: '40px', border: 'none', cursor: 'pointer' }}>{t.copy}</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div style={{ background: darkMode ? '#162235' : 'white', borderRadius: '28px', padding: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>🏛️ {lang === 'it' ? 'Scopri Mykonos' : lang === 'en' ? 'Discover Mykonos' : lang === 'fr' ? 'Découvrez Mykonos' : 'Descubre Mykonos'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '24px', marginTop: '24px' }}>
              <div style={{ background: darkMode ? '#0B131F' : '#EAF7FA', borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? '#38A1F3' : '#2A9D8F', marginBottom: '12px' }}>🏖️ {t.beachClubs}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.beachClubs.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>🌊 {c}</li>)}</ul>
              </div>
              <div style={{ background: darkMode ? '#0B131F' : '#EAF7FA', borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? '#38A1F3' : '#2A9D8F', marginBottom: '12px' }}>🎧 {t.nightClubs}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.nightClubs.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>🎵 {c}</li>)}</ul>
              </div>
              <div style={{ background: darkMode ? '#0B131F' : '#EAF7FA', borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? '#38A1F3' : '#2A9D8F', marginBottom: '12px' }}>🍽️ {t.restaurants}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.restaurants.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>🍴 {c}</li>)}</ul>
              </div>
              <div style={{ background: darkMode ? '#0B131F' : '#EAF7FA', borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? '#38A1F3' : '#2A9D8F', marginBottom: '12px' }}>⚡ {t.extras}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.extras.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : '#3E4A5B' }}>🚤 {c}</li>)}</ul>
              </div>
            </div>
            <p style={{ marginTop: '24px', color: darkMode ? '#E6EDF5' : '#6B7B8D', fontSize: '0.9rem', textAlign: 'center' }}>💡 Per prenotazioni e disponibilità, contattami su WhatsApp!</p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = (darkMode, hasError) => ({
  width: '100%',
  padding: '12px',
  borderRadius: '48px',
  border: hasError ? '2px solid #E03B7B' : `1px solid ${darkMode ? '#38A1F3' : '#2A9D8F'}`,
  background: darkMode ? '#0B131F' : '#FFFFFF',
  color: darkMode ? '#E6EDF5' : '#3E4A5B',
  fontSize: '1rem',
  boxSizing: 'border-box'
});

const selectStyle = (darkMode, hasError) => ({
  width: '100%',
  padding: '12px',
  borderRadius: '48px',
  border: hasError ? '2px solid #E03B7B' : `1px solid ${darkMode ? '#38A1F3' : '#2A9D8F'}`,
  background: darkMode ? '#0B131F' : '#FFFFFF',
  color: darkMode ? '#E6EDF5' : '#3E4A5B',
  fontSize: '1rem',
  boxSizing: 'border-box'
});
