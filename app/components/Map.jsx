'use client';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// Configurazione icone
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

// Legenda responsiva: su mobile orizzontale in basso, su desktop verticale a destra
function Legend({ darkMode, isMobile }) {
  const legendStyle = {
    position: 'absolute',
    bottom: 20,
    [isMobile ? 'left' : 'right']: isMobile ? 0 : 20,
    right: isMobile ? 0 : 'auto',
    left: isMobile ? 0 : 'auto',
    background: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(4px)',
    padding: isMobile ? '8px 12px' : '10px 14px',
    borderRadius: isMobile ? '0' : '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    fontSize: '12px',
    zIndex: 1000,
    fontFamily: 'sans-serif',
    border: darkMode ? '1px solid #444' : '1px solid #ddd',
    color: darkMode ? '#f0f0f0' : '#333',
    fontWeight: 500,
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' : 'left',
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    justifyContent: isMobile ? 'space-around' : 'flex-start',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
    gap: isMobile ? '8px' : '4px',
    pointerEvents: 'none', // per non interferire con i click sulla mappa
  };

  return (
    <div style={legendStyle}>
      <div style={{ fontWeight: 'bold', marginBottom: isMobile ? 0 : 6, marginRight: isMobile ? 8 : 0 }}>Legenda</div>
      {Object.entries(categoryColors).map(([cat, color]) => (
        <div key={cat} style={{ display: 'flex', alignItems: 'center', marginRight: isMobile ? 12 : 0, marginBottom: isMobile ? 0 : 5 }}>
          <div style={{ width: 14, height: 14, backgroundColor: color, borderRadius: '50%', marginRight: 6, boxShadow: '0 0 0 1px white' }}></div>
          <span>{categoryNames[cat]}</span>
        </div>
      ))}
    </div>
  );
}

const Map = forwardRef(({ darkMode, isMobile }, ref) => {
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
        // Apri il popup del marker più vicino (opzionale)
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

  // Dati dei luoghi (coordinate complete)
  const locations = {
    beachClub: [
      { name: "Kalua", coords: [37.424, 25.344], address: "Paraga Beach" },
      { name: "SantAnna", coords: [37.4245, 25.3445], address: "Paraga Beach" },
      { name: "Tropicana", coords: [37.424, 25.356], address: "Paradise Beach" },
      { name: "Scorpios", coords: [37.4235, 25.344], address: "Paraga Beach" },
      { name: "Alemagou", coords: [37.4651, 25.3515], address: "Ftelia Beach" },
      { name: "Nammos", coords: [37.41558, 25.33694], address: "Psarou Beach" },
      { name: "Principote", coords: [37.47679, 25.35983], address: "Panormos Beach" },
      { name: "Super Paradise", coords: [37.41622, 25.36857], address: "Super Paradise Beach" },
      { name: "Anios", coords: [37.419, 25.351], address: "Platis Gialos" },
      { name: "Branco", coords: [37.41395, 25.34503], address: "Platis Gialos" },
      { name: "Thalas", coords: [37.44246, 25.42302], address: "Super Paradise Beach" }
    ],
    restaurant: [
      { name: "Lio", coords: [37.444, 25.329], address: "Enoplon Dinameon 6" },
      { name: "Interni", coords: [37.444, 25.329], address: "Matogianni Street" },
      { name: "Mediterraneo", coords: [37.444, 25.329], address: "Mykonos Town" },
      { name: "Zuma Mykonos", coords: [37.444, 25.329], address: "Cavo Tagoo Hotel" },
      { name: "Cavo Tagoo", coords: [37.4515, 25.32863], address: "Tagoo Area" },
      { name: "Spilia", coords: [37.43458, 25.41924], address: "Agrari Beach" },
      { name: "Carosello", coords: [37.444, 25.329], address: "Mykonos Town" },
      { name: "Orama", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Cantera", coords: [37.444, 25.329], address: "Mykonos Town" }
    ],
    nightClub: [
      { name: "Toy Room Mykonos", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Semeli", coords: [37.44395, 25.33007], address: "Mykonos Town" },
      { name: "We❤️Myk", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Void", coords: [37.4445, 25.3278], address: "Lakka Square" },
      { name: "Bombonierre", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Queen", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Tabù", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Cavo Paradiso", coords: [37.431, 25.377], address: "Paradise Beach" },
      { name: "Tape", coords: [37.445, 25.33], address: "Mykonos Town" }
    ]
  };

  if (!isClient) {
    return (
      <div style={{ 
        height: '500px', 
        background: darkMode ? '#0B131F' : '#F3EFE9',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: darkMode ? '#E6EDF5' : '#3E4A5B',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        Caricamento mappa...
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
      <MapContainer
        center={mykonosCenter}
        zoom={defaultZoom}
        style={{ height: '500px', width: '100%', zIndex: 1 }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={false} // Rimuove il controllo attribuzione di default
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
              <Tooltip sticky direction="top" offset={[0, -10]} opacity={0.9}>
                <span style={{ fontWeight: 'bold' }}>{place.name}</span>
              </Tooltip>
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
      <Legend darkMode={darkMode} isMobile={isMobile} />
    </div>
  );
});

Map.displayName = 'Map';

export default Map;
