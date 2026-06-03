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

function Legend({ darkMode, isMobile }) {
  const legendStyle = {
    position: 'absolute',
    bottom: 12,
    left: 12,
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
        <span>Beach Club</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 12, height: 12, backgroundColor: categoryColors.restaurant, borderRadius: '50%' }}></div>
        <span>Ristorante</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 12, height: 12, backgroundColor: categoryColors.nightClub, borderRadius: '50%' }}></div>
        <span>Night Club</span>
      </div>
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

  // Coordinate aggiornate secondo la tabella fornita
  const locations = {
    beachClub: [
      { name: "Kalua", coords: [37.4149, 25.3465], address: "Paraga Beach" },
      { name: "SantAnna", coords: [37.4140, 25.3460], address: "Paraga Beach" },
      { name: "Tropicana", coords: [37.4266, 25.3387], address: "Paradise Beach" },
      { name: "Scorpios", coords: [37.4133, 25.3445], address: "Paraga Beach" },
      { name: "Alemagou", coords: [37.4651, 25.3515], address: "Ftelia Beach" },
      { name: "Nammos", coords: [37.4187, 25.3294], address: "Psarou Beach" },
      { name: "Principote", coords: [37.4763258, 25.3597796], address: "Panormos Beach" },
      { name: "Super Paradise", coords: [37.4203, 25.3620], address: "Super Paradise Beach" },
      { name: "Anios", coords: [37.4137, 25.3219], address: "Platis Gialos" },
      { name: "Branco", coords: [37.4138, 25.3215], address: "Platis Gialos" },
      { name: "Thalassa", coords: [37.4134, 25.3211], address: "Platis Gialos" }
    ],
    restaurant: [
      { name: "Lío", coords: [37.4475, 25.3284], address: "Enoplon Dinameon 6" },
      { name: "Interni", coords: [37.4469, 25.3280], address: "Matogianni" },
      { name: "Mediterraneo", coords: [37.4472, 25.3276], address: "Lakka Square" },
      { name: "Zuma Mykonos", coords: [37.4543, 25.3237], address: "Cavo Tagoo Hotel" },
      { name: "Cavo Tagoo", coords: [37.4543, 25.3237], address: "Tagoo Area" },
      { name: "Spilia", coords: [37.4373, 25.4328], address: "Kalafati" },
      { name: "Carosello", coords: [37.4468, 25.3280], address: "Mykonos Town" },
      { name: "Orama", coords: [37.4500, 25.3265], address: "Old Port" },
      { name: "Cantera", coords: [37.4462, 25.3254], address: "Little Venice" }
    ],
    nightClub: [
      { name: "Toy Room Mykonos", coords: [37.4460, 25.3250], address: "Little Venice" },
      { name: "Semeli The Bar", coords: [37.4461, 25.3248], address: "Little Venice" },
      { name: "We❤️Myk", coords: [37.4475, 25.3285], address: "Mykonos Town" },
      { name: "Void", coords: [37.4471, 25.3278], address: "Lakka" },
      { name: "Bombonierre", coords: [37.4474, 25.3282], address: "Mykonos Town" },
      { name: "Queen of Mykonos", coords: [37.4476, 25.3283], address: "Enoplon Dinameon" },
      { name: "Tabu", coords: [37.4470, 25.3277], address: "Mykonos Town" },
      { name: "Cavo Paradiso", coords: [37.4246, 25.3419], address: "Paradise Beach" },
      { name: "Tape", coords: [37.4473, 25.3281], address: "Mykonos Town" }
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
    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', height: '500px', width: '100%' }}>
      <MapContainer
        center={mykonosCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={false}
        preferCanvas={true}
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
              <Tooltip sticky direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
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
