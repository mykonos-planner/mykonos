export const dynamic = 'force-dynamic';
'use client';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [lang, setLang] = useState('it');
  const [showExplore, setShowExplore] = useState(true);
  const [formData, setFormData] = useState({ name: '', groupSize: 2, arrivalDate: '', stayDays: '7', customDays: '', budget: 'mid' });
  const [generatedMsg, setGeneratedMsg] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data.events || []));
  }, []);

  const translations = {
    it: { explore: '📅 Esplora eventi', planning: '✍️ Planning & Richiesta', name: 'Nome e cognome', group: 'Numero di persone', arrival: 'Data di arrivo', days: 'Giorni di soggiorno', budgetLabel: 'Budget', budgetOpts: { luxury: 'Lusso', mid: 'Mid Range', budget: 'Budget' }, generate: 'Genera messaggio', copy: 'Copia messaggio' },
    en: { explore: '📅 Explore events', planning: '✍️ Planning & Request', name: 'Full name', group: 'Number of people', arrival: 'Arrival date', days: 'Days of stay', budgetLabel: 'Budget', budgetOpts: { luxury: 'Luxury', mid: 'Mid Range', budget: 'Budget' }, generate: 'Generate message', copy: 'Copy message' }
  };
  const t = translations[lang] || translations.it;

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
      <div style={{ textAlign: 'right' }}>
        {['it','en'].map(l => <button key={l} onClick={() => setLang(l)} style={{ margin: 5, padding: '5px 10px', background: lang===l ? '#1e2a3e' : 'white', color: lang===l ? 'white' : 'black', border: '1px solid #ccc', borderRadius: 30 }}>{l.toUpperCase()}</button>)}
      </div>
      <h1>🏝️ Mykonos Promoter</h1>
      <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
        <button onClick={() => setShowExplore(true)} style={{ background: showExplore ? '#1e2a3e' : '#ccc', color: 'white', padding: '10px 20px', borderRadius: 40, border: 'none' }}>{t.explore}</button>
        <button onClick={() => setShowExplore(false)} style={{ background: !showExplore ? '#1e2a3e' : '#ccc', color: 'white', padding: '10px 20px', borderRadius: 40, border: 'none' }}>{t.planning}</button>
      </div>

      {showExplore ? (
        <div style={{ background: 'white', borderRadius: 28, padding: 24 }}>
          <h2>📆 Calendario eventi</h2>
          {events.length === 0 ? <p>Caricamento...</p> : events.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(ev => (
            <div key={ev.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold', minWidth: 100 }}>{ev.date}</span>
              <span style={{ flex: 2 }}>{ev.name}</span>
              <span style={{ minWidth: 120 }}>{ev.venue}</span>
              <span style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: 20 }}>{ev.category} {ev.budget && `(${ev.budget})`}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 28, padding: 24 }}>
          <h2>✍️ Crea il tuo programma</h2>
          <input type="text" placeholder={t.name} value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} style={{ width: '100%', marginBottom: 10, padding: 10, borderRadius: 16, border: '1px solid #ccc' }} />
          <input type="number" placeholder={t.group} value={formData.groupSize} onChange={e=>setFormData({...formData, groupSize:e.target.value})} style={{ width: '100%', marginBottom: 10, padding: 10, borderRadius: 16, border: '1px solid #ccc' }} />
          <input type="date" value={formData.arrivalDate} onChange={e=>setFormData({...formData, arrivalDate:e.target.value})} style={{ width: '100%', marginBottom: 10, padding: 10, borderRadius: 16, border: '1px solid #ccc' }} />
          <select value={formData.stayDays} onChange={e=>setFormData({...formData, stayDays:e.target.value})} style={{ width: '100%', marginBottom: 10, padding: 10, borderRadius: 16 }}>
            <option value="3">3 giorni</option><option value="5">5</option><option value="7">7</option><option value="10">10</option><option value="14">14</option><option value="custom">Personalizza</option>
          </select>
          {formData.stayDays === 'custom' && <input type="number" placeholder="Numero giorni" value={formData.customDays} onChange={e=>setFormData({...formData, customDays:e.target.value})} style={{ width: '100%', marginBottom: 10, padding: 10, borderRadius: 16 }} />}
          <select value={formData.budget} onChange={e=>setFormData({...formData, budget:e.target.value})} style={{ width: '100%', marginBottom: 10, padding: 10, borderRadius: 16 }}>
            <option value="luxury">💰 Luxury</option><option value="mid">💵 Mid Range</option><option value="budget">🟢 Budget</option>
          </select>
          <button onClick={handleGenerate} style={{ background: '#1e2a3e', color: 'white', padding: '10px 20px', borderRadius: 40, border: 'none' }}>{t.generate}</button>
          {generatedMsg && (
            <div style={{ marginTop: 20, background: '#f1f5f9', padding: 16, borderRadius: 20, whiteSpace: 'pre-wrap' }}>
              {generatedMsg}
              <button onClick={()=>{navigator.clipboard.writeText(generatedMsg); alert('Copiato!')}} style={{ marginTop: 10, background: '#2c7a47', color: 'white', padding: '8px 16px', borderRadius: 40, border: 'none' }}>{t.copy}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
