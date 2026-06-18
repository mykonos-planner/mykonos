'use client';
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const categoryColors = {
  beachClub: '#1E3A5F',
  restaurant: '#4A90E2',
  nightClub: '#F4A261',
};

const categoryNames = {
  beachClub: '🏖️ Beach Club',
  restaurant: '🍽️ Ristorante',
  nightClub: '🎧 Night Club',
};

// ==================== LEGENDA ====================
function Legend({ darkMode, isMobile, t }) {
  const legendStyle = {
    position: 'absolute',
    bottom: 12,
    left: isMobile ? '50%' : 12,
    transform: isMobile ? 'translateX(-50%)' : 'none',
    background: darkMode ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(4px)',
    padding: isMobile ? '6px 12px' : '8px 16px',
    borderRadius: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    fontSize: isMobile ? '11px' : '13px',
    zIndex: 1000,
    fontFamily: 'sans-serif',
    border: darkMode ? '1px solid #444' : '1px solid #ddd',
    color: darkMode ? '#f0f0f0' : '#333',
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'row',
    gap: isMobile ? 12 : 20,
    alignItems: 'center',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  };
  return (
    <div style={legendStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 12, height: 12, backgroundColor: categoryColors.beachClub, borderRadius: '50%' }}></div>
        <span>{t.beachClubLabel}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 12, height: 12, backgroundColor: categoryColors.restaurant, borderRadius: '50%' }}></div>
        <span>{t.restaurantLabel}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 12, height: 12, backgroundColor: categoryColors.nightClub, borderRadius: '50%' }}></div>
        <span>{t.nightClubLabel}</span>
      </div>
    </div>
  );
}

// ==================== BARRA DI RICERCA ====================
function SearchBar({ locations, onSelect, darkMode, isMobile, t }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const allPlaces = Object.values(locations).flatMap(category => category);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = allPlaces.filter(place =>
        place.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.name);
    setShowResults(false);
    onSelect(place.coords);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 12,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{ width: isMobile ? '90%' : '300px', position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder={t.searchPlaceholder}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: '40px',
            border: darkMode ? '1px solid #444' : '1px solid #ddd',
            background: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
            color: darkMode ? '#f0f0f0' : '#333',
            fontSize: '14px',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            boxSizing: 'border-box',
          }}
        />
        {showResults && results.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: darkMode ? 'rgba(0,0,0,0.9)' : 'white',
            borderRadius: '20px',
            marginTop: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 1001,
          }}>
            {results.map((place, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(place)}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  borderBottom: darkMode ? '1px solid #333' : '1px solid #eee',
                  color: darkMode ? '#f0f0f0' : '#333',
                  fontSize: '13px',
                }}
              >
                {place.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== MAPPA ====================
const Map = forwardRef(({ darkMode, isMobile, t }, ref) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    setIsClient(true);
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setError('Token Mapbox mancante. Aggiungi NEXT_PUBLIC_MAPBOX_TOKEN alle variabili d\'ambiente.');
    } else {
      mapboxgl.accessToken = token;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    flyTo: (lng, lat, zoom = 16) => {
      if (map.current) {
        map.current.flyTo({ center: [lng, lat], zoom, duration: 1200 });
      }
    }
  }), []);

  useEffect(() => {
    if (!isClient || error || !mapContainer.current || map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [25.35, 37.45],
        zoom: 12,
        attributionControl: false,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

      setTimeout(() => {
        if (map.current) map.current.resize();
      }, 100);
    } catch (err) {
      setError(err.message);
    }

    return () => {
      if (map.current) map.current.remove();
    };
  }, [isClient, error]);

  useEffect(() => {
    if (!map.current || error) return;

    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    const locations = {
      beachClub: [
        { name: "Kalua", coords: [25.349664, 37.408069], address: "Paraga Beach" },
        { name: "SantAnna", coords: [25.348914, 37.408450], address: "Paraga Beach" },
        { name: "Tropicana", coords: [25.356731, 37.410286], address: "Paradise Beach" },
        { name: "Scorpios", coords: [25.347631, 37.407244], address: "Paraga Beach" },
        { name: "Alemagou", coords: [25.380850, 37.464667], address: "Ftelia Beach" },
        { name: "Nammos", coords: [25.337111, 37.415597], address: "Psarou Beach" },
        { name: "Principote", coords: [25.359892, 37.476622], address: "Panormos Beach" },
        { name: "Super Paradise", coords: [25.369467, 37.415503], address: "Super Paradise" },
        { name: "Anios", coords: [25.344194, 37.414403], address: "Platis Gialos" },
        { name: "Branco", coords: [25.345183, 37.414025], address: "Platis Gialos" },
        { name: "Thalas", coords: [25.368308, 37.415119], address: "Super Paradise" }
      ],
      restaurant: [
        { name: "Lío", coords: [25.328236, 37.444994], address: "Enoplon Dinameon 6" },
        { name: "Interni", coords: [25.328708, 37.445589], address: "Matogianni" },
        { name: "Mediterraneo", coords: [25.328706, 37.445592], address: "Lakka Square" },
        { name: "Zuma Mykonos", coords: [25.329533, 37.458539], address: "Cavo Tagoo Hotel" },
        { name: "Cavo Tagoo", coords: [25.328942, 37.456669], address: "Tagoo Area" },
        { name: "Spilia", coords: [25.419383, 37.434731], address: "Kalafati" },
        { name: "Carosello Lunch @ Baladaya", coords: [25.35785, 37.41044], address: "Baladaya Beach" },
        { name: "Carosello Dinner @ Pinky Beach", coords: [25.34863, 37.40977], address: "Pinky Beach" },
        { name: "Orama", coords: [25.326158, 37.425753], address: "Old Port" },
        { name: "Cantera", coords: [25.326300, 37.445947], address: "Little Venice" }
      ],
      nightClub: [
        { name: "Toy Room Mykonos", coords: [25.326497, 37.445694], address: "Little Venice" },
        { name: "Semeli The Bar", coords: [25.326511, 37.445697], address: "Little Venice" },
        { name: "We❤️Myk", coords: [25.329436, 37.447578], address: "Mykonos Town" },
        { name: "Void", coords: [25.328611, 37.444306], address: "Lakka" },
        { name: "Bombonierre", coords: [25.328100, 37.444981], address: "Mykonos Town" },
        { name: "Queen of Mykonos", coords: [25.328308, 37.445203], address: "Enoplon Dinameon" },
        { name: "Tabu", coords: [25.328306, 37.447200], address: "Mykonos Town" },
        { name: "Cavo Paradiso", coords: [25.360436, 37.408081], address: "Paradise Beach" },
        { name: "Tape", coords: [25.329428, 37.447842], address: "Mykonos Town" }
      ]
    };

    Object.entries(locations).forEach(([category, places]) => {
      places.forEach((place, idx) => {
        const el = document.createElement('div');
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="${categoryColors[category]}" stroke="white" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
        el.style.cursor = 'pointer';
        el.style.width = '28px';
        el.style.height = '28px';

        const popupContent = `
          <div style="font-family:sans-serif;min-width:150px;padding:4px 0;">
            <strong style="font-size:1rem;color:#1a1a1a;">${place.name}</strong><br/>
            <span style="font-size:0.85rem;color:#555;">${place.address}</span><br/>
            <span style="font-size:0.75rem;color:#888;">${categoryNames[category]}</span>
          </div>
        `;

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(place.coords)
          .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: true, className: 'custom-popup' }).setHTML(popupContent))
          .addTo(map.current);

        markers.current[`${category}-${idx}`] = marker;
      });
    });
  }, [map.current, error, isClient]);

  const handleSearchSelect = (coords) => {
    if (map.current) {
      map.current.flyTo({ center: [coords[1], coords[0]], zoom: 16, duration: 1200 });
    }
  };

  if (!isClient) {
    return (
      <div style={{ 
        height: '500px', 
        background: darkMode ? '#0B131F' : '#F3EFE9',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: darkMode ? '#E6EDF5' : '#3E4A5B'
      }}>
        Caricamento mappa...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: '500px', 
        background: '#f8d7da',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#721c24',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div>
          <strong>Errore mappa:</strong><br />
          {error}<br />
          <small>Verifica la variabile d'ambiente NEXT_PUBLIC_MAPBOX_TOKEN su Vercel.</small>
        </div>
      </div>
    );
  }

  // Preparo i dati per la SearchBar (costruisco l'oggetto locations nella forma attesa)
  const locationsForSearch = {
    beachClub: [
      { name: "Kalua", coords: [37.408069, 25.349664] },
      { name: "SantAnna", coords: [37.408450, 25.348914] },
      { name: "Tropicana", coords: [37.410286, 25.356731] },
      { name: "Scorpios", coords: [37.407244, 25.347631] },
      { name: "Alemagou", coords: [37.464667, 25.380850] },
      { name: "Nammos", coords: [37.415597, 25.337111] },
      { name: "Principote", coords: [37.476622, 25.359892] },
      { name: "Super Paradise", coords: [37.415503, 25.369467] },
      { name: "Anios", coords: [37.414403, 25.344194] },
      { name: "Branco", coords: [37.414025, 25.345183] },
      { name: "Thalas", coords: [37.415119, 25.368308] }
    ],
    restaurant: [
      { name: "Lío", coords: [37.444994, 25.328236] },
      { name: "Interni", coords: [37.445589, 25.328708] },
      { name: "Mediterraneo", coords: [37.445592, 25.328706] },
      { name: "Zuma Mykonos", coords: [37.458539, 25.329533] },
      { name: "Cavo Tagoo", coords: [37.456669, 25.328942] },
      { name: "Spilia", coords: [37.434731, 25.419383] },
      { name: "Carosello Lunch @ Baladaya", coords: [37.41044, 25.35785] },
      { name: "Carosello Dinner @ Pinky Beach", coords: [37.40977, 25.34863] },
      { name: "Orama", coords: [37.425753, 25.326158] },
      { name: "Cantera", coords: [37.445947, 25.326300] }
    ],
    nightClub: [
      { name: "Toy Room Mykonos", coords: [37.445694, 25.326497] },
      { name: "Semeli The Bar", coords: [37.445697, 25.326511] },
      { name: "We❤️Myk", coords: [37.447578, 25.329436] },
      { name: "Void", coords: [37.444306, 25.328611] },
      { name: "Bombonierre", coords: [37.444981, 25.328100] },
      { name: "Queen of Mykonos", coords: [37.445203, 25.328308] },
      { name: "Tabu", coords: [37.447200, 25.328306] },
      { name: "Cavo Paradiso", coords: [37.408081, 25.360436] },
      { name: "Tape", coords: [37.447842, 25.329428] }
    ]
  };

  return (
    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', height: '500px', width: '100%' }}>
      <SearchBar locations={locationsForSearch} onSelect={handleSearchSelect} darkMode={darkMode} isMobile={isMobile} t={t} />
      <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
      <Legend darkMode={darkMode} isMobile={isMobile} t={t} />
    </div>
  );
});

Map.displayName = 'Map';
export default Map;
