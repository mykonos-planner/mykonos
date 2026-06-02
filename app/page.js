'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [lang, setLang] = useState('it');
  const [activeTab, setActiveTab] = useState('explore');
  const [formData, setFormData] = useState({
    name: '', groupSize: '2', arrivalDate: '', stayDays: '7', customDays: '', budget: 'mid'
  });
  const [generatedMsg, setGeneratedMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterVenue, setFilterVenue] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
      document.body.style.backgroundColor = '#EAF7FA';
      document.body.style.color = '#3E4A5B';
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
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 200);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
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
      generate: 'Genera itinerario',
      copy: 'Copia',
      subtitle: 'Il tuo assistente personale per una vacanza da sogno',
      categories: { 'Night Club': 'Night Club', 'Beach Club': 'Beach Club', 'Restaurant': 'Dinner Show', 'Service': 'Servizio', 'Beach': 'Spiaggia' },
      beachClubs: 'Beach Club',
      nightClubs: 'Night Club',
      restaurants: 'Ristoranti',
      extras: 'Extra (noleggi, sport, transfer)',
      filterCat: 'Filtra per categoria',
      filterVenue: 'Filtra per locale',
      all: 'Tutti',
      dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      morningLabel: 'Mattina',
      lunchLabel: 'Pranzo',
      afternoonLabel: 'Pomeriggio',
      dinnerLabel: 'Cena',
      eveningLabel: 'Serata',
      prevMonth: '◀',
      nextMonth: '▶'
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
      categories: { 'Night Club': 'Night Club', 'Beach Club': 'Beach Club', 'Restaurant': 'Dinner Show', 'Service': 'Service', 'Beach': 'Beach' },
      beachClubs: 'Beach Clubs',
      nightClubs: 'Night Clubs',
      restaurants: 'Restaurants',
      extras: 'Extras (rentals, sports, transfer)',
      filterCat: 'Filter by category',
      filterVenue: 'Filter by venue',
      all: 'All',
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      morningLabel: 'Morning',
      lunchLabel: 'Lunch',
      afternoonLabel: 'Afternoon',
      dinnerLabel: 'Dinner',
      eveningLabel: 'Evening',
      prevMonth: '◀',
      nextMonth: '▶'
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
      categories: { 'Night Club': 'Club de nuit', 'Beach Club': 'Club de plage', 'Restaurant': 'Dinner Show', 'Service': 'Service', 'Beach': 'Plage' },
      beachClubs: 'Clubs de plage',
      nightClubs: 'Boîtes de nuit',
      restaurants: 'Restaurants',
      extras: 'Extras (locations, sports, transfert)',
      filterCat: 'Filtrer par catégorie',
      filterVenue: 'Filtrer par lieu',
      all: 'Tous',
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      morningLabel: 'Matin',
      lunchLabel: 'Déjeuner',
      afternoonLabel: 'Après-midi',
      dinnerLabel: 'Dîner',
      eveningLabel: 'Soirée',
      prevMonth: '◀',
      nextMonth: '▶'
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
      categories: { 'Night Club': 'Discoteca', 'Beach Club': 'Club de playa', 'Restaurant': 'Dinner Show', 'Service': 'Servicio', 'Beach': 'Playa' },
      beachClubs: 'Clubes de playa',
      nightClubs: 'Discotecas',
      restaurants: 'Restaurantes',
      extras: 'Extras (alquileres, deportes, traslado)',
      filterCat: 'Filtrar por categoría',
      filterVenue: 'Filtrar por lugar',
      all: 'Todos',
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      morningLabel: 'Mañana',
      lunchLabel: 'Almuerzo',
      afternoonLabel: 'Tarde',
      dinnerLabel: 'Cena',
      eveningLabel: 'Noche',
      prevMonth: '◀',
      nextMonth: '▶'
    }
  };
  const t = translations[lang] || translations.it;

  const monthNames = {
    it: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const validEvents = events.filter(ev => ev.date && ev.date > '2020-01-01');
  const filteredEvents = validEvents.filter(ev => {
    if (filterCategory !== 'all' && ev.category !== filterCategory) return false;
    if (filterVenue !== 'all' && ev.venue !== filterVenue) return false;
    return true;
  });

  const eventsByDay = {};
  daysArray.forEach(day => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    eventsByDay[dateStr] = filteredEvents.filter(ev => ev.date === dateStr);
  });

  const uniqueVenues = [...new Set(validEvents.map(ev => ev.venue).filter(Boolean))];

  const venueColors = {};
  const colorPalette = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7B787', '#B5EAD7', '#C7CEE6', '#FFB347', '#AEC6CF'];
  uniqueVenues.forEach((venue, idx) => {
    venueColors[venue] = colorPalette[idx % colorPalette.length];
  });
  const defaultColor = '#AAAAAA';

  const validateForm = () => {
    let err = {};
    if (!formData.name.trim()) err.name = true;
    const groupNum = parseInt(formData.groupSize);
    if (isNaN(groupNum) || groupNum < 1) err.groupSize = true;
    if (!formData.arrivalDate) err.arrivalDate = true;
    let days = formData.stayDays === 'custom' ? formData.customDays : formData.stayDays;
    if (!days || parseInt(days) <= 0) err.stayDays = true;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const generateItinerary = () => {
    if (!validateForm()) return;
    let days = parseInt(formData.stayDays === 'custom' ? formData.customDays : formData.stayDays);
    if (isNaN(days)) days = 7;
    const startDate = new Date(formData.arrivalDate);
    const budgetLevel = formData.budget;
    const groupNum = parseInt(formData.groupSize) || 1;

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days - 1);
    const eventsInRange = validEvents.filter(ev => {
      const evDate = new Date(ev.date);
      return evDate >= startDate && evDate <= endDate;
    });

    let musicEvents = eventsInRange.filter(ev => ev.category === 'Night Club' || ev.type === 'event');
    let allRestaurants = events.filter(ev => ev.type === 'restaurant');
    let beachesList = events.filter(ev => ev.type === 'beach');
    let extrasList = events.filter(ev => ev.type === 'extra' && ev.serviceType !== 'scooter' && ev.serviceType !== 'car');

    const filterByBudget = (item) => {
      if (!item.budget) return true;
      if (budgetLevel === 'budget') {
        return item.budget === 'budget' || item.budget === 'mid';
      } else if (budgetLevel === 'mid') {
        return item.budget === 'mid';
      } else {
        return item.budget === 'luxury';
      }
    };

    allRestaurants = allRestaurants.filter(filterByBudget);
    beachesList = beachesList.filter(filterByBudget);
    extrasList = extrasList.filter(filterByBudget);
    extrasList = extrasList.filter(extra => {
      const min = extra.minPersons;
      const max = extra.maxPersons;
      if (min && groupNum < min) return false;
      if (max && groupNum > max) return false;
      return true;
    });

    // Escludi i dinner show (es. Carosello) dal pranzo
    const lunchCandidates = allRestaurants.filter(r => !r.name.toLowerCase().includes('dinner show'));
    const dinnerCandidates = allRestaurants;

    let filteredMusicEvents = musicEvents.filter(filterByBudget);
    if (budgetLevel === 'luxury' && filteredMusicEvents.length === 0) {
      filteredMusicEvents = musicEvents.filter(ev => !ev.budget || ev.budget === 'luxury' || ev.budget === 'mid');
    }
    musicEvents = filteredMusicEvents;

    let activitiesList = [...beachesList];
    if (budgetLevel !== 'budget') {
      activitiesList = [...activitiesList, ...extrasList];
    }
    if (activitiesList.length === 0) {
      activitiesList = [{ name: 'Relax' }];
    }

    let previousLateNight = false;
    let itinerary = '';

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayOfWeek = t.dayNames[currentDate.getDay()];
      const localizedDate = currentDate.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
      const formattedDateISO = currentDate.toISOString().slice(0,10);

      const dayEvents = musicEvents.filter(ev => ev.date === formattedDateISO);
      let musicSuggestion;
      if (dayEvents.length > 0) {
        musicSuggestion = `${dayEvents[0].name} @ ${dayEvents[0].venue}`;
      } else if (musicEvents.length > 0) {
        const fallbackEvent = musicEvents[i % musicEvents.length];
        musicSuggestion = `${fallbackEvent.name} @ ${fallbackEvent.venue}`;
      } else {
        musicSuggestion = 'Serata libera';
      }

      const isLateNight = !musicSuggestion.includes('Serata libera');

      let morningActivity;
      if (previousLateNight) {
        const freeBeaches = beachesList.filter(b => !b.budget || b.budget === 'budget');
        if (freeBeaches.length > 0) {
          morningActivity = freeBeaches[i % freeBeaches.length].name;
        } else {
          morningActivity = 'Relax';
        }
      } else {
        morningActivity = activitiesList.length > 0 ? activitiesList[i % activitiesList.length].name : 'Relax';
      }

      let afternoonActivity;
      if (activitiesList.length > 1) {
        let idx = (i + Math.floor(activitiesList.length / 2)) % activitiesList.length;
        afternoonActivity = activitiesList[idx].name;
      } else if (activitiesList.length === 1) {
        afternoonActivity = activitiesList[0].name;
      } else {
        afternoonActivity = 'Relax';
      }

      let lunchRestaurant, dinnerRestaurant;
      if (lunchCandidates.length === 0) {
        lunchRestaurant = 'Taverna locale';
      } else {
        lunchRestaurant = lunchCandidates[i % lunchCandidates.length].name;
      }
      if (dinnerCandidates.length === 0) {
        dinnerRestaurant = 'Taverna locale';
      } else {
        let dinnerIndex = i % dinnerCandidates.length;
        if (dinnerCandidates.length > 1 && dinnerCandidates[dinnerIndex].name === lunchRestaurant) {
          dinnerIndex = (dinnerIndex + 1) % dinnerCandidates.length;
        }
        dinnerRestaurant = dinnerCandidates[dinnerIndex].name;
      }

      itinerary += `\n📅 ${dayOfWeek} ${localizedDate}\n`;
      itinerary += `   ☀️ ${t.morningLabel}: ${morningActivity}\n`;
      itinerary += `   🍽️ ${t.lunchLabel}: ${lunchRestaurant}\n`;
      itinerary += `   🌞 ${t.afternoonLabel}: ${afternoonActivity}\n`;
      itinerary += `   🍽️ ${t.dinnerLabel}: ${dinnerRestaurant}\n`;
      itinerary += `   🎧 ${t.eveningLabel}: ${musicSuggestion}\n`;

      previousLateNight = isLateNight;
    }

    const groupNumInt = parseInt(formData.groupSize) || 1;
    const msg = `🏝️ MYKONOS PLANNING 🏝️\n━━━━━━━━━━━━━━━━━━\n👤 ${t.name}: ${formData.name}\n👥 ${t.group}: ${groupNumInt}\n📅 ${t.arrival}: ${formData.arrivalDate}\n⏱️ ${t.days}: ${days}\n💰 ${t.budgetLabel}: ${budgetLevel === 'luxury' ? 'Luxury' : budgetLevel === 'mid' ? 'Mid Range' : 'Budget'}\n${itinerary}`;
    setGeneratedMsg(msg);
  };

  const servicesData = {
    beachClubs: ['Scorpios', 'Nammos', 'Principote', 'SantAnna', 'Kalua', 'Anios', 'Super Paradise', 'Tropicana'],
    nightClubs: ['Cavo Paradiso', 'Alemagou', 'Interni', 'Void', 'Monastery'],
    restaurants: ['Carosello (Dinner Show)', 'Cavotagoo Chef\'s Table', 'Interni Restaurant', 'Thalas', 'Ling Ling'],
    extras: ['Jetski', 'Flyboard', 'Parasailing', 'Boat rental (RIB)', 'Private cruise', 'ATV/Quad', 'Water taxi', 'Mykonos Boat Party']
  };

  const transitionStyle = {
    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'translateX(10px)' : 'translateX(0)'
  };

  const lightPrimary = '#1E3A5F';
  const lightSecondary = '#4A90E2';
  const lightBgCard = '#FFFFFF';
  const lightBgAlt = '#F8F9FA';
  const lightText = '#3E4A5B';
  const lightTextMuted = '#6B7B8D';
  const accentOrange = '#F4A261';
  const accentBlue = '#38A1F3';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Barra lingua e tema */}
      <div style={{ display: 'flex', justifyContent: isMobile ? 'space-between' : 'flex-end', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', width: '100%' }}>
        <div style={{ display: 'flex', gap: '8px', flex: isMobile ? 1 : 'none', justifyContent: isMobile ? 'space-evenly' : 'flex-end', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
          {['it','en','fr','es'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? (darkMode ? accentBlue : lightPrimary) : 'transparent',
              color: lang === l ? 'white' : (darkMode ? '#E6EDF5' : lightText),
              border: `1px solid ${darkMode ? accentBlue : lightPrimary}`,
              borderRadius: '40px', padding: '6px 16px', cursor: 'pointer', fontWeight: lang === l ? 'bold' : 'normal', textAlign: 'center', fontSize: isMobile ? '0.85rem' : '0.9rem'
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
        <button onClick={toggleDark} style={{ background: darkMode ? accentOrange : lightPrimary, color: 'white', border: 'none', borderRadius: '40px', padding: '6px 16px', cursor: 'pointer', fontSize: isMobile ? '0.85rem' : '0.9rem' }}>{darkMode ? '☀️' : '🌙'}</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 5vw, 3rem)', color: darkMode ? accentBlue : lightPrimary, marginBottom: '8px' }}>🏝️ Mykonos Planning</h1>
        <p style={{ color: darkMode ? '#E6EDF5' : lightTextMuted, opacity: 0.9, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.subtitle}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {['explore','planning','services'].map(tab => (
          <button key={tab} onClick={() => changeTab(tab)} style={{
            background: activeTab === tab ? (darkMode ? accentBlue : lightPrimary) : (darkMode ? '#162235' : lightBgAlt),
            color: activeTab === tab ? 'white' : (darkMode ? '#E6EDF5' : lightText),
            border: activeTab === tab ? 'none' : `1px solid ${lightPrimary}`,
            padding: isMobile ? '8px 16px' : '10px 24px',
            borderRadius: '40px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: isMobile ? '0.85rem' : '1rem'
          }}>
            {tab === 'explore' && t.explore}
            {tab === 'planning' && t.planning}
            {tab === 'services' && t.services}
          </button>
        ))}
      </div>

      <div style={transitionStyle}>
        {activeTab === 'explore' && (
          <div style={{ 
            background: darkMode ? '#162235' : lightBgCard,
            borderRadius: '28px',
            padding: isMobile ? '16px' : '24px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
              <h2 style={{ margin: 0, color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '1.3rem' : '1.5rem', textAlign: 'center' }}>📆 {lang === 'it' ? 'Calendario eventi' : lang === 'en' ? 'Event Calendar' : lang === 'fr' ? 'Calendrier des événements' : 'Calendario de eventos'}</h2>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button onClick={prevMonth} style={{ background: darkMode ? '#0B131F' : lightBgAlt, border: `1px solid ${lightPrimary}`, borderRadius: '40px', padding: '6px 12px', cursor: 'pointer', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.prevMonth}</button>
                <span style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 'bold', color: darkMode ? '#E6EDF5' : lightText }}>{monthNames[lang][currentMonth]} {currentYear}</span>
                <button onClick={nextMonth} style={{ background: darkMode ? '#0B131F' : lightBgAlt, border: `1px solid ${lightPrimary}`, borderRadius: '40px', padding: '6px 12px', cursor: 'pointer', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.nextMonth}</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ padding: '8px 16px', borderRadius: '40px', background: darkMode ? '#0B131F' : lightBgAlt, border: `1px solid ${darkMode ? accentBlue : lightPrimary}`, color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                <option value="all">{t.all} categorie</option>
                <option value="Night Club">{t.categories['Night Club']}</option>
                <option value="Beach Club">{t.categories['Beach Club']}</option>
                <option value="Restaurant">{t.categories['Restaurant']}</option>
              </select>
              <select value={filterVenue} onChange={e => setFilterVenue(e.target.value)} style={{ padding: '8px 16px', borderRadius: '40px', background: darkMode ? '#0B131F' : lightBgAlt, border: `1px solid ${darkMode ? accentBlue : lightPrimary}`, color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                <option value="all">{t.all} locali</option>
                {uniqueVenues.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            {(() => {
              const hasEvents = daysArray.some(day => {
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                return eventsByDay[dateStr] && eventsByDay[dateStr].length > 0;
              });
              if (!hasEvents) {
                return <p style={{ textAlign: 'center', color: darkMode ? '#E6EDF5' : lightTextMuted, fontSize: isMobile ? '0.9rem' : '1rem' }}>Nessun evento in questo mese con i filtri selezionati.</p>;
              }
              return daysArray.map(day => {
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayEvents = eventsByDay[dateStr] || [];
                if (dayEvents.length === 0) return null;
                const dateObj = new Date(currentYear, currentMonth, day);
                const dayName = t.dayNames[dateObj.getDay()];
                return (
                  <div key={day} style={{ marginBottom: '24px', borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`, paddingBottom: '16px' }}>
                    <h3 style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: darkMode ? '#E6EDF5' : lightText, marginBottom: '12px' }}>{dayName} {day} {monthNames[lang][currentMonth]}</h3>
                    {dayEvents.map(ev => {
                      const venueColor = venueColors[ev.venue] || defaultColor;
                      return (
                        <div key={ev.id} style={{
                          background: darkMode ? '#0B131F' : lightBgAlt,
                          borderRadius: '16px',
                          padding: isMobile ? '12px 10px' : '12px 16px',
                          marginBottom: '10px',
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          justifyContent: 'space-between',
                          alignItems: isMobile ? 'stretch' : 'center',
                          borderLeft: `4px solid ${venueColor}`,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          gap: isMobile ? '8px' : '0'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', color: venueColor, fontSize: isMobile ? '0.95rem' : '1rem' }}>
                              {ev.name}
                            </div>
                            {isMobile && (
                              <div style={{ fontSize: '0.85rem', color: darkMode ? '#E6EDF5' : lightText, marginTop: '4px' }}>
                                @ {ev.venue}
                              </div>
                            )}
                            {!isMobile && (
                              <div style={{ fontSize: '1rem', color: darkMode ? '#E6EDF5' : lightText }}>
                                @ {ev.venue}
                              </div>
                            )}
                          </div>
                          <div style={{
                            background: darkMode ? `${accentOrange}20` : `${lightSecondary}20`,
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: isMobile ? '0.7rem' : '0.75rem',
                            color: darkMode ? accentOrange : lightSecondary,
                            whiteSpace: 'nowrap',
                            alignSelf: isMobile ? 'flex-start' : 'center'
                          }}>
                            {t.categories[ev.category] || ev.category}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              });
            })()}
          </div>
        )}

        {activeTab === 'planning' && (
          <div style={{ 
            background: darkMode ? '#162235' : lightBgCard,
            borderRadius: '28px',
            padding: isMobile ? '20px' : '24px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <h2 style={{ color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '1.4rem' : '1.8rem' }}>✍️ {lang === 'it' ? 'Crea il tuo programma' : lang === 'en' ? 'Create your program' : lang === 'fr' ? 'Créez votre programme' : 'Crea tu programa'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.name}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : lightTextMuted, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{t.nameDesc}</small>
                <input type="text" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} style={inputStyle(darkMode, errors.name, darkMode ? accentBlue : lightPrimary, isMobile)} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.group}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : lightTextMuted, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{t.groupDesc}</small>
                <input 
                  type="text" 
                  inputMode="numeric" 
                  pattern="\d*"
                  value={formData.groupSize} 
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData({...formData, groupSize: val === '' ? '' : parseInt(val).toString()});
                  }}
                  style={{
                    ...inputStyle(darkMode, errors.groupSize, darkMode ? accentBlue : lightPrimary, isMobile),
                    appearance: 'textfield',
                    MozAppearance: 'textfield',
                    WebkitAppearance: 'none'
                  }}
                  placeholder="es. 4"
                />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.arrival}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : lightTextMuted, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{t.arrivalDesc}</small>
                <input 
                  type="date" 
                  value={formData.arrivalDate} 
                  onChange={e=>setFormData({...formData,arrivalDate:e.target.value})} 
                  style={{
                    ...inputStyle(darkMode, errors.arrivalDate, darkMode ? accentBlue : lightPrimary, isMobile),
                    minWidth: '0',
                    width: '100%',
                    fontSize: '16px',
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }} 
                />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.days}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : lightTextMuted, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{t.daysDesc}</small>
                <select value={formData.stayDays} onChange={e=>setFormData({...formData,stayDays:e.target.value})} style={selectStyle(darkMode, errors.stayDays, darkMode ? accentBlue : lightPrimary, isMobile)}>
                  <option value="3">3</option><option value="5">5</option><option value="7">7</option><option value="10">10</option><option value="14">14</option><option value="custom">Custom</option>
                </select>
                {formData.stayDays === 'custom' && <input type="number" placeholder="#" value={formData.customDays} onChange={e=>setFormData({...formData,customDays:e.target.value})} style={{ ...inputStyle(darkMode, false, darkMode ? accentBlue : lightPrimary, isMobile), marginTop: '10px' }} />}
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.budgetLabel}</label>
                <small style={{ display: 'block', color: darkMode ? '#E6EDF5' : lightTextMuted, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{t.budgetDesc}</small>
                <select value={formData.budget} onChange={e=>setFormData({...formData,budget:e.target.value})} style={selectStyle(darkMode, false, darkMode ? accentBlue : lightPrimary, isMobile)}>
                  <option value="luxury">💰 Luxury</option><option value="mid">💵 Mid Range</option><option value="budget">🟢 Budget</option>
                </select>
              </div>
              <button onClick={generateItinerary} style={{ background: darkMode ? accentBlue : lightPrimary, color: 'white', border: 'none', padding: '14px', borderRadius: '48px', fontWeight: 'bold', cursor: 'pointer', fontSize: isMobile ? '0.9rem' : '1rem' }}>{t.generate}</button>
              {generatedMsg && (
                <div style={{ marginTop: '20px', background: darkMode ? '#0B131F' : lightBgAlt, padding: '20px', borderRadius: '24px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                  {generatedMsg}
                  <button onClick={()=>{navigator.clipboard.writeText(generatedMsg); alert('Copiato!');}} style={{ marginTop: '12px', background: lightSecondary, color: 'white', padding: '8px 20px', borderRadius: '40px', border: 'none', cursor: 'pointer', fontSize: isMobile ? '0.85rem' : '0.9rem' }}>{t.copy}</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div style={{ background: darkMode ? '#162235' : lightBgCard, borderRadius: '28px', padding: isMobile ? '20px' : '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '1.4rem' : '1.8rem' }}>🏛️ {lang === 'it' ? 'Scopri Mykonos' : lang === 'en' ? 'Discover Mykonos' : lang === 'fr' ? 'Découvrez Mykonos' : 'Descubre Mykonos'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '24px', marginTop: '24px' }}>
              <div style={{ background: darkMode ? '#0B131F' : lightBgAlt, borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? accentBlue : lightPrimary, marginBottom: '12px', fontSize: isMobile ? '1.1rem' : '1.2rem' }}>🏖️ {t.beachClubs}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.beachClubs.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.85rem' : '0.9rem' }}>🌊 {c}</li>)}</ul>
              </div>
              <div style={{ background: darkMode ? '#0B131F' : lightBgAlt, borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? accentBlue : lightPrimary, marginBottom: '12px', fontSize: isMobile ? '1.1rem' : '1.2rem' }}>🎧 {t.nightClubs}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.nightClubs.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.85rem' : '0.9rem' }}>🎵 {c}</li>)}</ul>
              </div>
              <div style={{ background: darkMode ? '#0B131F' : lightBgAlt, borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? accentBlue : lightPrimary, marginBottom: '12px', fontSize: isMobile ? '1.1rem' : '1.2rem' }}>🍽️ {t.restaurants}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.restaurants.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.85rem' : '0.9rem' }}>🍴 {c}</li>)}</ul>
              </div>
              <div style={{ background: darkMode ? '#0B131F' : lightBgAlt, borderRadius: '20px', padding: '16px' }}>
                <h3 style={{ color: darkMode ? accentBlue : lightPrimary, marginBottom: '12px', fontSize: isMobile ? '1.1rem' : '1.2rem' }}>⚡ {t.extras}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{servicesData.extras.map(c => <li key={c} style={{ marginBottom: '8px', color: darkMode ? '#E6EDF5' : lightText, fontSize: isMobile ? '0.85rem' : '0.9rem' }}>🚤 {c}</li>)}</ul>
              </div>
            </div>
            <p style={{ marginTop: '24px', color: darkMode ? '#E6EDF5' : lightTextMuted, fontSize: isMobile ? '0.8rem' : '0.9rem', textAlign: 'center' }}>💡 Per prenotazioni e disponibilità, contattami su WhatsApp!</p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = (darkMode, hasError, primaryColor, isMobile) => ({
  width: '100%',
  maxWidth: '100%',
  padding: isMobile ? '10px 12px' : '12px',
  borderRadius: '48px',
  border: hasError ? '2px solid #E03B7B' : `1px solid ${primaryColor}`,
  background: darkMode ? '#0B131F' : '#FFFFFF',
  color: darkMode ? '#E6EDF5' : '#3E4A5B',
  fontSize: isMobile ? '0.9rem' : '1rem',
  boxSizing: 'border-box',
  display: 'block',
  minHeight: isMobile ? '44px' : '52px',
  lineHeight: 'normal'
});

const selectStyle = (darkMode, hasError, primaryColor, isMobile) => ({
  width: '100%',
  padding: isMobile ? '10px 12px' : '12px',
  borderRadius: '48px',
  border: hasError ? '2px solid #E03B7B' : `1px solid ${primaryColor}`,
  background: darkMode ? '#0B131F' : '#FFFFFF',
  color: darkMode ? '#E6EDF5' : '#3E4A5B',
  fontSize: isMobile ? '0.9rem' : '1rem',
  boxSizing: 'border-box',
  minHeight: isMobile ? '44px' : '52px'
});
