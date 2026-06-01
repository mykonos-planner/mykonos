'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [lang, setLang] = useState('it');
  const [showExplore, setShowExplore] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    groupSize: 2,
    arrivalDate: '',
    stayDays: '7',
    customDays: '',
    budget: 'mid'
  });
  const [generatedMsg, setGeneratedMsg] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data.events || []));
  }, []);

  // Traduzioni complete (italiano, inglese, francese, spagnolo)
  const translations = {
    it: {
      explore: '📅 Esplora eventi',
      planning: '✍️ Planning & Richiesta',
      name: 'Nome e cognome',
      group: 'Numero di persone',
      arrival: 'Data di arrivo',
      days: 'Giorni di soggiorno',
      budgetLabel: 'Budget',
      budgetOpts: { luxury: 'Lusso', mid: 'Mid Range', budget: 'Budget' },
      generate: 'Genera messaggio',
      copy: 'Copia messaggio',
      categories: {
        'Night Club': 'Night Club',
        'Beach Club': 'Beach Club',
        'Restaurant': 'Ristorante',
        'Boat Party': 'Boat Party'
      }
    },
    en: {
      explore: '📅 Explore events',
      planning: '✍️ Planning & Request',
      name: 'Full name',
      group: 'Number of people',
      arrival: 'Arrival date',
      days: 'Days of stay',
      budgetLabel: 'Budget',
      budgetOpts: { luxury: 'Luxury', mid: 'Mid Range', budget: 'Budget' },
      generate: 'Generate message',
      copy: 'Copy message',
      categories: {
        'Night Club': 'Night Club',
        'Beach Club': 'Beach Club',
        'Restaurant': 'Restaurant',
        'Boat Party': 'Boat Party'
      }
    },
    fr: {
      explore: '📅 Explorer événements',
      planning: '✍️ Planification & Demande',
      name: 'Nom complet',
      group: 'Nombre de personnes',
      arrival: "Date d'arrivée",
      days: 'Jours de séjour',
      budgetLabel: 'Budget',
      budgetOpts: { luxury: 'Luxe', mid: 'Milieu de gamme', budget: 'Économique' },
      generate: 'Générer message',
      copy: 'Copier message',
      categories: {
        'Night Club': 'Club de nuit',
        'Beach Club': 'Club de plage',
        'Restaurant': 'Restaurant',
        'Boat Party': 'Fête en bateau'
      }
    },
    es: {
      explore: '📅 Explorar eventos',
      planning: '✍️ Planificación & Solicitud',
      name: 'Nombre completo',
      group: 'Número de personas',
      arrival: 'Fecha de llegada',
      days: 'Días de estancia',
      budgetLabel: 'Presupuesto',
      budgetOpts: { luxury: 'Lujo', mid: 'Gama media', budget: 'Económico' },
      generate: 'Generar mensaje',
      copy: 'Copiar mensaje',
      categories: {
        'Night Club': 'Discoteca',
        'Beach Club': 'Club de playa',
        'Restaurant': 'Restaurante',
        'Boat Party': 'Fiesta en barco'
      }
    }
  };

  const t = translations[lang] || translations.it;

  // Funzione per raggruppare eventi per mese/anno
  const groupEventsByMonth = (eventsList) => {
    const groups = {};
    eventsList.forEach(ev => {
      const date = new Date(ev.date);
      const monthYear = `${date.toLocaleString(lang, { month: 'long', year: 'numeric' })}`;
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(ev);
    });
    return groups;
  };

  const handleGenerate = () => {
    let days = formData.stayDays === 'custom' ? formData.customDays : formData.stayDays;
    if (!days || days <= 0) days = 7;
    const arrival = new Date(formData.arrivalDate);
    const departure = new Date(arrival);
    departure.setDate(arrival.getDate() + parseInt(days) - 1);
    const eventsInRange = events.filter(ev => {
      const evDate = new Date(ev.date);
      return evDate >= arrival && evDate <= departure;
    }).slice(0, 5);
    let eventList = '';
    if (eventsInRange.length) {
      eventList = '\n\n📅 Eventi suggeriti:\n' + eventsInRange.map(ev => `- ${ev.date} ${ev.name} @ ${ev.venue} (${ev.budget})`).join('\n');
    }
    const msg = `*NUOVA RICHIESTA MYKONOS* 🏝️\nNome: ${formData.name}\nPersone: ${formData.groupSize}\nArrivo: ${formData.arrivalDate}\nSoggiorno: ${days} giorni\nBudget: ${t.budgetOpts[formData.budget]}\n\nInteressi: beach club, ristoranti, night club, noleggi, boat party, transfer.\nPuoi consigliarmi un itinerario? Grazie!${eventList}`;
    setGeneratedMsg(msg);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      {/* Barra lingue */}
      <div style={{ textAlign: 'right', marginBottom: 20 }}>
        {['it', 'en', 'fr', 'es'].map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              margin: '0 5px',
              padding: '6px 12px',
              background: lang === l ? '#1e2a3e' : 'white',
              color: lang === l ? 'white' : '#1e2a3e',
              border: '1px solid #ccc',
              borderRadius: 30,
              cursor: 'pointer',
              fontWeight: lang === l ? 'bold' : 'normal'
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Titolo e sottotitolo */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e2a3e', marginBottom: 8 }}>🏝️ Mykonos Promoter</h1>
        <p style={{ color: '#4a5568' }}>Organizza la tua esperienza su misura</p>
      </div>

      {/* Pulsanti esplora/planning */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 40 }}>
        <button
          onClick={() => setShowExplore(true)}
          style={{
            background: showExplore ? '#1e2a3e' : '#e2e8f0',
            color: showExplore ? 'white' : '#1e2a3e',
            padding: '12px 28px',
            borderRadius: 40,
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.2s'
          }}
        >
          {t.explore}
        </button>
        <button
          onClick={() => setShowExplore(false)}
          style={{
            background: !showExplore ? '#1e2a3e' : '#e2e8f0',
            color: !showExplore ? 'white' : '#1e2a3e',
            padding: '12px 28px',
            borderRadius: 40,
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {t.planning}
        </button>
      </div>

      {showExplore ? (
        // Calendario eventi raggruppato per mesi
        <div style={{ background: 'white', borderRadius: 28, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: 20, color: '#1e2a3e' }}>📆 {lang === 'it' ? 'Calendario eventi' : lang === 'en' ? 'Event Calendar' : lang === 'fr' ? 'Calendrier des événements' : 'Calendario de eventos'}</h2>
          {events.length === 0 ? (
            <p style={{ color: '#64748b' }}>Nessun evento caricato.</p>
          ) : (
            (() => {
              const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
              const grouped = groupEventsByMonth(sortedEvents);
              return Object.keys(grouped).map(month => (
                <div key={month} style={{ marginBottom: 30 }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#2c3e4e', borderLeft: '4px solid #1e2a3e', paddingLeft: 12, marginBottom: 16 }}>
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </h3>
                  {grouped[month].map(ev => (
                    <div
                      key={ev.id}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #e2e8f0',
                        padding: '12px 0',
                        transition: 'background 0.1s'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', minWidth: 100, color: '#1e2a3e' }}>{ev.date}</span>
                      <span style={{ flex: 2, margin: '0 12px', color: '#2d3748' }}>{ev.name}</span>
                      <span style={{ minWidth: 120, color: '#4a5568' }}>{ev.venue}</span>
                      <span style={{ background: '#e9ecef', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500 }}>
                        {t.categories[ev.category] || ev.category}
                      </span>
                    </div>
                  ))}
                </div>
              ));
            })()
          )}
        </div>
      ) : (
        // Form di planning
        <div style={{ background: 'white', borderRadius: 28, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: 20, color: '#1e2a3e' }}>✍️ {lang === 'it' ? 'Crea il tuo programma' : lang === 'en' ? 'Create your program' : lang === 'fr' ? 'Créez votre programme' : 'Crea tu programa'}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="text"
              placeholder={t.name}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: 12, borderRadius: 16, border: '1px solid #cbd5e0', fontSize: '1rem' }}
            />
            <input
              type="number"
              placeholder={t.group}
              value={formData.groupSize}
              onChange={e => setFormData({ ...formData, groupSize: e.target.value })}
              style={{ width: '100%', padding: 12, borderRadius: 16, border: '1px solid #cbd5e0', fontSize: '1rem' }}
            />
            <input
              type="date"
              value={formData.arrivalDate}
              onChange={e => setFormData({ ...formData, arrivalDate: e.target.value })}
              style={{ width: '100%', padding: 12, borderRadius: 16, border: '1px solid #cbd5e0', fontSize: '1rem' }}
            />
            <select
              value={formData.stayDays}
              onChange={e => setFormData({ ...formData, stayDays: e.target.value })}
              style={{ width: '100%', padding: 12, borderRadius: 16, border: '1px solid #cbd5e0', fontSize: '1rem' }}
            >
              <option value="3">3 {lang === 'it' ? 'giorni' : lang === 'en' ? 'days' : lang === 'fr' ? 'jours' : 'días'}</option>
              <option value="5">5 {lang === 'it' ? 'giorni' : lang === 'en' ? 'days' : lang === 'fr' ? 'jours' : 'días'}</option>
              <option value="7">7 {lang === 'it' ? 'giorni' : lang === 'en' ? 'days' : lang === 'fr' ? 'jours' : 'días'}</option>
              <option value="10">10 {lang === 'it' ? 'giorni' : lang === 'en' ? 'days' : lang === 'fr' ? 'jours' : 'días'}</option>
              <option value="14">14 {lang === 'it' ? 'giorni' : lang === 'en' ? 'days' : lang === 'fr' ? 'jours' : 'días'}</option>
              <option value="custom">{lang === 'it' ? 'Personalizza' : lang === 'en' ? 'Custom' : lang === 'fr' ? 'Personnaliser' : 'Personalizar'}</option>
            </select>
            {formData.stayDays === 'custom' && (
              <input
                type="number"
                placeholder={lang === 'it' ? 'Numero giorni' : lang === 'en' ? 'Number of days' : lang === 'fr' ? 'Nombre de jours' : 'Número de días'}
                value={formData.customDays}
                onChange={e => setFormData({ ...formData, customDays: e.target.value })}
                style={{ width: '100%', padding: 12, borderRadius: 16, border: '1px solid #cbd5e0', fontSize: '1rem' }}
              />
            )}
            <select
              value={formData.budget}
              onChange={e => setFormData({ ...formData, budget: e.target.value })}
              style={{ width: '100%', padding: 12, borderRadius: 16, border: '1px solid #cbd5e0', fontSize: '1rem' }}
            >
              <option value="luxury">💰 {t.budgetOpts.luxury}</option>
              <option value="mid">💵 {t.budgetOpts.mid}</option>
              <option value="budget">🟢 {t.budgetOpts.budget}</option>
            </select>
            <button
              onClick={handleGenerate}
              style={{ background: '#1e2a3e', color: 'white', padding: '12px 24px', borderRadius: 40, border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: 8 }}
            >
              {t.generate}
            </button>
            {generatedMsg && (
              <div style={{ marginTop: 24, background: '#f1f5f9', padding: 20, borderRadius: 20, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {generatedMsg}
                <button
                  onClick={() => { navigator.clipboard.writeText(generatedMsg); alert(lang === 'it' ? 'Copiato!' : lang === 'en' ? 'Copied!' : lang === 'fr' ? 'Copié !' : '¡Copiado!'); }}
                  style={{ marginTop: 12, background: '#2c7a47', color: 'white', padding: '8px 16px', borderRadius: 40, border: 'none', cursor: 'pointer' }}
                >
                  {t.copy}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
