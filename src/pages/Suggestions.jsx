import { useEffect, useState } from 'react';
import { getSuggestions } from '../api/foursquare';
import { normalizeCity } from '../utils/normalizeCity'; // asegúrate que el archivo exista
import './Suggestions.css';

function Suggestions({ city }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      const correctedCity = normalizeCity(city);
      console.log('Buscando sugerencias para:', correctedCity);

      try {
        const results = await getSuggestions(correctedCity);
        setPlaces(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    }

    if (city) {
      fetchSuggestions();
    }
  }, [city]);

  if (loading) return <p>Loading suggestions...</p>;

  return (
    <div className="suggestions-container">
      <h2>Suggestions in {city}</h2>
      <div className="suggestions-grid">
        {places.length > 0 ? (
          places.map((place) => (
            <div key={place.fsq_id} className="suggestion-card">
              {place.photoUrl && (
                <img
                  src={place.photoUrl}
                  alt={place.name}
                  className="suggestion-photo"
                />
              )}
              <h3>{place.name}</h3>
              <p>{place.categories?.[0]?.name || 'Category unknown'}</p>
              <p>{place.location?.formatted_address || 'No address'}</p>
            </div>
          ))
        ) : (
          <p>No suggestions found.</p>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
