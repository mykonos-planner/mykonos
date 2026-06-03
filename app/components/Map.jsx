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

  // Coordinate convertite da gradi/minuti/secondi a decimali
  const locations = {
    beachClub: [
      { name: "Kalua", coords: [37.408069, 25.349664], address: "Paraga Beach" },         // 37°24'29.05"N 25°20'58.79"E
      { name: "SantAnna", coords: [37.408450, 25.348914], address: "Paraga Beach" },       // 37°24'30.42"N 25°20'56.09"E
      { name: "Tropicana", coords: [37.410286, 25.356731], address: "Paradise Beach" },    // 37°24'37.03"N 25°21'24.23"E
      { name: "Scorpios", coords: [37.407244, 25.347631], address: "Paraga Beach" },       // 37°24'24.88"N 25°20'51.47"E
      { name: "Alemagou", coords: [37.464667, 25.380850], address: "Ftelia Beach" },       // 37°27'52.80"N 25°22'51.06"E
      { name: "Nammos", coords: [37.415597, 25.337111], address: "Psarou Beach" },         // 37°24'56.15"N 25°20'13.60"E
      { name: "Principote", coords: [37.476622, 25.359892], address: "Panormos Beach" },   // 37°28'35.84"N 25°21'35.61"E
      { name: "Super Paradise", coords: [37.415503, 25.369467], address: "Super Paradise" },// 37°24'55.81"N 25°22'10.08"E
      { name: "Anios", coords: [37.414403, 25.344194], address: "Platis Gialos" },         // 37°24'51.85"N 25°20'39.10"E
      { name: "Branco", coords: [37.414025, 25.345183], address: "Platis Gialos" },        // 37°24'50.49"N 25°20'42.66"E
      { name: "Thalas", coords: [37.415119, 25.368308], address: "Super Paradise" }        // 37°24'54.43"N 25°22'05.91"E
    ],
    restaurant: [
      { name: "Lío", coords: [37.444994, 25.328236], address: "Enoplon Dinameon 6" },      // 37°26'41.98"N 25°19'41.65"E
      { name: "Interni", coords: [37.445589, 25.328708], address: "Matogianni" },          // 37°26'44.12"N 25°19'43.35"E
      { name: "Mediterraneo", coords: [37.445592, 25.328706], address: "Lakka Square" },   // 37°26'44.13"N 25°19'43.34"E
      { name: "Zuma Mykonos", coords: [37.458539, 25.329533], address: "Cavo Tagoo Hotel" },// 37°27'30.74"N 25°19'46.32"E
      { name: "Cavo Tagoo", coords: [37.456669, 25.328942], address: "Tagoo Area" },       // 37°27'24.01"N 25°19'44.19"E
      { name: "Spilia", coords: [37.434731, 25.419383], address: "Kalafati" },             // 37°26'05.03"N 25°25'09.78"E
      { name: "Carosello", coords: [37.445, 25.328], address: "Mykonos Town (centro)" },   // generico, mancante
      { name: "Orama", coords: [37.425753, 25.326158], address: "Old Port" },              // 37°25'32.71"N 25°19'34.17"E
      { name: "Cantera", coords: [37.445947, 25.326300], address: "Little Venice" }        // 37°26'45.41"N 25°19'34.68"E
    ],
    nightClub: [
      { name: "Toy Room Mykonos", coords: [37.445694, 25.326497], address: "Little Venice" },// 37°26'45.70"N 25°19'35.39"E
      { name: "Semeli The Bar", coords: [37.445697, 25.326511], address: "Little Venice" }, // 37°26'45.71"N 25°19'35.44"E
      { name: "We❤️Myk", coords: [37.447578, 25.329436], address: "Mykonos Town" },       // 37°26'51.28"N 25°19'45.97"E
      { name: "Void", coords: [37.444306, 25.328611], address: "Lakka" },                  // 37°26'39.50"N 25°19'43.00"E
      { name: "Bombonierre", coords: [37.444981, 25.328100], address: "Mykonos Town" },    // 37°26'41.93"N 25°19'41.16"E
      { name: "Queen of Mykonos", coords: [37.445203, 25.328308], address: "Enoplon Dinameon" },// 37°26'42.73"N 25°19'41.91"E
      { name: "Tabu", coords: [37.447200, 25.328306], address: "Mykonos Town" },           // 37°26'49.92"N 25°19'41.90"E
      { name: "Cavo Paradiso", coords: [37.408081, 25.360436], address: "Paradise Beach" },// 37°24'29.09"N 25°21'37.57"E
      { name: "Tape", coords: [37.447842, 25.329428], address: "Mykonos Town" }            // 37°26'52.23"N 25°19'45.94"E
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
