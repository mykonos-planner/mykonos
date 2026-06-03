'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configurazione icone di default di Leaflet per evitare errori
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Colori per le diverse categorie
const categoryColors = {
  beachClub: '#1E3A5F',    // Blu profondo
  restaurant: '#4A90E2',   // Azzurro mare
  nightClub: '#F4A261',    // Arancione tramonto
  extra: '#E03B7B',        // Rosa bouganville
};

// Icone personalizzate per categoria
const createCustomIcon = (color) => {
  return new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="${color}" stroke="white" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    iconSize: [24, 24],
    popupAnchor: [0, -12],
    className: 'custom-marker',
  });
};

// Componente per centrare la mappa
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map]);
  return null;
}

export default function Map({ darkMode }) {
  const [isClient, setIsClient] = useState(false);
  
  // Coordinata centrale di Mykonos (centro dell'isola)
  const mykonosCenter = [37.45, 25.35];
  const defaultZoom = 12;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dati dei luoghi (coordinate ricavate da Google Maps e fonti varie)
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
      { name: "Zuma", coords: [37.444, 25.329], address: "Cavo Tagoo Hotel" },
      { name: "Cavo Tagoo", coords: [37.4515, 25.32863], address: "Tagoo Area" },
      { name: "Spilia", coords: [37.43458, 25.41924], address: "Agrari Beach" },
      { name: "Carosello", coords: [37.444, 25.329], address: "Mykonos Town" },
      { name: "Orama", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Cantera", coords: [37.444, 25.329], address: "Mykonos Town" }
    ],
    nightClub: [
      { name: "Toy Room", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Semeli", coords: [37.44395, 25.33007], address: "Mykonos Town" },
      { name: "Void", coords: [37.4445, 25.3278], address: "Lakka Square" },
      { name: "Bombonierre", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Queen", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Tabù", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Tape", coords: [37.445, 25.33], address: "Mykonos Town" },
      { name: "Cavo Paradiso", coords: [37.431, 25.377], address: "Paradise Beach" },
      { name: "We❤️Myk", coords: [37.445, 25.33], address: "Mykonos Town" }
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
        color: darkMode ? '#E6EDF5' : '#3E4A5B'
      }}>
        Caricamento mappa...
      </div>
    );
  }

  return (
    <MapContainer
      center={mykonosCenter}
      zoom={defaultZoom}
      style={{ height: '500px', width: '100%', borderRadius: '20px', zIndex: 1 }}
      scrollWheelZoom={true}
    >
      <MapUpdater center={mykonosCenter} zoom={defaultZoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {Object.entries(locations).map(([category, places]) => 
        places.map((place, idx) => (
          <Marker
            key={`${category}-${idx}`}
            position={place.coords}
            icon={createCustomIcon(categoryColors[category])}
          >
            <Popup>
              <div>
                <strong>{place.name}</strong>
                <br />
                {place.address}
                <br />
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                  {category === 'beachClub' ? '🏖️ Beach Club' : category === 'restaurant' ? '🍽️ Ristorante' : '🎧 Night Club'}
                </span>
              </div>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
}