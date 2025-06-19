import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css'; // ✅ Asegúrate de que esta línea esté en la parte superior

function InteractiveMap({ lat = 48.8566, lon = 2.3522 }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      L.marker([lat, lon])
        .addTo(mapInstance.current)
        .bindPopup('Selected location')
        .openPopup();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lon]);

  return <div ref={mapRef} className="map-container" />;
}

export default InteractiveMap;
