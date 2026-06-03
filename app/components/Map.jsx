'use client';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

const createCustomIcon = (color) => {
  return new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="${color}" stroke="white" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    iconSize: [28, 28],
    popupAnchor: [0, -14],
    className: 'custom-marker',
  });
};

function MapRefHandler({ setMap }) {
  const map = useMap();
  useEffect(() => {
    if (setMap) setMap(map);
  }, [map, setMap]);
  return null;
}

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

// Barra di ricerca con autocompletamento (centrata su mobile)
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

const Map = forwardRef(({ darkMode, isMobile, t }, ref) => {
  const [isClient, setIsClient] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const mykonosCenter = [37.45, 25.35];
  const defaultZoom = 12;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useImperativeHandle(ref, () => ({
    flyTo: (lat, lng, zoom = 16) => {
      if (mapInstance) {
        mapInstance.flyTo([lat, lng], zoom, { duration: 1.2 });
        setTimeout(() => {
          let closestMarker = null;
          let minDist = Infinity;
          mapInstance.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              const ll = layer.getLatLng();
              const dist = Math.hypot(ll.lat - lat, ll.lng - lng);
              if (dist < minDist) {
                minDist = dist;
                closestMarker = layer;
              }
            }
          });
          if (closestMarker) closestMarker.openPopup();
        }, 1300);
      }
    }
  }), [mapInstance]);

  const handleSearchSelect = (coords) => {
    if (mapInstance) {
      mapInstance.flyTo(coords, 16, { duration: 1.2 });
      setTimeout(() => {
        let closestMarker = null;
        let minDist = Infinity;
        mapInstance.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            const ll = layer.getLatLng();
            const dist = Math.hypot(ll.lat - coords[0], ll.lng - coords[1]);
            if (dist < minDist) {
              minDist = dist;
              closestMarker = layer;
            }
          }
        });
        if (closestMarker) closestMarker.openPopup();
      }, 1300);
    }
  };

  const locations = {
    beachClub: [
      { name: "Kalua", coords: [37.408069, 25.349664], address: "Paraga Beach" },
      { name: "SantAnna", coords: [37.408450, 25.348914], address: "Paraga Beach" },
      { name: "Tropicana", coords: [37.410286, 25.356731], address: "Paradise Beach" },
      { name: "Scorpios", coords: [37.407244, 25.347631], address: "Paraga Beach" },
      { name: "Alemagou", coords: [37.464667, 25.380850], address: "Ftelia Beach" },
      { name: "Nammos", coords: [37.415597, 25.337111], address: "Psarou Beach" },
      { name: "Principote", coords: [37.476622, 25.359892], address: "Panormos Beach" },
      { name: "Super Paradise", coords: [37.415503, 25.369467], address: "Super Paradise" },
      { name: "Anios", coords: [37.414403, 25.344194], address: "Platis Gialos" },
      { name: "Branco", coords: [37.414025, 25.345183], address: "Platis Gialos" },
      { name: "Thalas", coords: [37.415119, 25.368308], address: "Super Paradise" }
    ],
    restaurant: [
      { name: "Lío", coords: [37.444994, 25.328236], address: "Enoplon Dinameon 6" },
      { name: "Interni", coords: [37.445589, 25.328708], address: "Matogianni" },
      { name: "Mediterraneo", coords: [37.445592, 25.328706], address: "Lakka Square" },
      { name: "Zuma Mykonos", coords: [37.458539, 25.329533], address: "Cavo Tagoo Hotel" },
      { name: "Cavo Tagoo", coords: [37.456669, 25.328942], address: "Tagoo Area" },
      { name: "Spilia", coords: [37.434731, 25.419383], address: "Kalafati" },
      { name: "Carosello", coords: [37.445, 25.328], address: "Mykonos Town" },
      { name: "Orama", coords: [37.425753, 25.326158], address: "Old Port" },
      { name: "Cantera", coords: [37.445947, 25.326300], address: "Little Venice" }
    ],
    nightClub: [
      { name: "Toy Room Mykonos", coords: [37.445694, 25.326497], address: "Little Venice" },
      { name: "Semeli The Bar", coords: [37.445697, 25.326511], address: "Little Venice" },
      { name: "We❤️Myk", coords: [37.447578, 25.329436], address: "Mykonos Town" },
      { name: "Void", coords: [37.444306, 25.328611], address: "Lakka" },
      { name: "Bombonierre", coords: [37.444981, 25.328100], address: "Mykonos Town" },
      { name: "Queen of Mykonos", coords: [37.445203, 25.328308], address: "Enoplon Dinameon" },
      { name: "Tabu", coords: [37.447200, 25.328306], address: "Mykonos Town" },
      { name: "Cavo Paradiso", coords: [37.408081, 25.360436], address: "Paradise Beach" },
      { name: "Tape", coords: [37.447842, 25.329428], address: "Mykonos Town" }
    ]
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

  return (
    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', height: '500px', width: '100%', transform: 'translateZ(0)' }}>
      <SearchBar locations={locations} onSelect={handleSearchSelect} darkMode={darkMode} isMobile={isMobile} t={t} />
      <MapContainer
        center={mykonosCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={false}
        tap={false}
        worldCopyJump={false}
        maxZoom={18}
        minZoom={10}
      >
        <MapRefHandler setMap={setMapInstance} />
        <TileLayer
          attribution=''
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {Object.entries(locations).map(([category, places]) => 
          places.map((place, idx) => (
            <Marker
              key={`${category}-${idx}`}
              position={place.coords}
              icon={createCustomIcon(categoryColors[category])}
            >
              {!isMobile && (
                <Tooltip sticky direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
                  <span style={{ fontWeight: 'bold' }}>{place.name}</span>
                </Tooltip>
              )}
              <Popup>
                <div style={{ fontFamily: 'sans-serif', minWidth: '150px' }}>
                  <strong style={{ fontSize: '1rem' }}>{place.name}</strong>
                  <br />
                  <span style={{ fontSize: '0.8rem', color: '#555' }}>{place.address}</span>
                  <br />
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>{categoryNames[category]}</span>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
      <Legend darkMode={darkMode} isMobile={isMobile} t={t} />
    </div>
  );
});

Map.displayName = 'Map';

export default Map;
