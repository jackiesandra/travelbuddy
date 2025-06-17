import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function InteractiveMap({ lat = 48.8566, lon = 2.3522 }) {
  const mapRef = useRef(null); // referencia al div
  const mapInstance = useRef(null); // referencia al mapa de Leaflet

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

    // Cleanup cuando el componente se desmonta
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lon]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%', borderRadius: '8px' }} />;
}

export default InteractiveMap;
