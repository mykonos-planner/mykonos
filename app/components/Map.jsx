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

const Map = forwardRef(({ darkMode, isMobile, t }, ref) => {
  const [isClient, setIsClient] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    setIsClient(true);
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  }, []);

  useImperativeHandle(ref, () => ({
    flyTo: (lng, lat, zoom = 16) => {
      if (map.current) {
        map.current.flyTo({ center: [lng, lat], zoom, duration: 1200 });
      }
    }
  }), []);

  useEffect(() => {
    if (!isClient || !mapContainer.current || map.current) return;

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
      map.current.resize();
    }, 100);

    return () => {
      if (map.current) map.current.remove();
    };
  }, [isClient]);

  useEffect(() => {
    if (!map.current) return;

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
        { name: "Carosello", coords: [25.328, 37.445], address: "Mykonos Town" },
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

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(place.coords)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="font-family:sans-serif;min-width:150px">
              <strong style="font-size:1rem">${place.name}</strong><br/>
              <span style="font-size:0.8rem;color:#555">${place.address}</span><br/>
              <span style="font-size:0.75rem;color:#888">${categoryNames[category]}</span>
            </div>
          `))
          .addTo(map.current);

        markers.current[`${category}-${idx}`] = marker;
      });
    });
  }, [map.current, isClient]);

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
      <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
    </div>
  );
});

Map.displayName = 'Map';
export default Map;