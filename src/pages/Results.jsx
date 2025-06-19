import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchPlaces } from '../api/foursquare';
import { getCountryInfo } from '../api/restcountries'; 
import defaultImg from '../assets/images/default.jpg';
import './Results.css';

function Results() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const location = searchParams.get('location');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (location && category) {
        setLoading(true);
        const data = await searchPlaces(category, location);
        setResults(data);
        setLoading(false);
      }
    };
    fetchResults();
  }, [location, category]);

  useEffect(() => {
    const fetchInfo = async () => {
      if (location) {
        const info = await getCountryInfo(location);
        setCountryInfo(info);
      }
    };
    fetchInfo();
  }, [location]);

  return (
    <div className="results-container">
      <h2>Results for "{category}" in {location}</h2>

      {countryInfo && (
        <div className="destination-info">
          <h3>🌍 Info about {countryInfo.name}</h3>
          <img src={countryInfo.flag} alt={`Flag of ${countryInfo.name}`} width="100" />
          <p><strong>Language:</strong> {countryInfo.language}</p>
          <p><strong>Currency:</strong> {countryInfo.currency}</p>
          <p><strong>Timezone:</strong> {countryInfo.timezone}</p>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <Link
          to={`/itinerary?place=${encodeURIComponent(location)}`}
          className="itinerary-link"
        >
          View itinerary for {location}
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}

      <div className="card-grid">
        {results.map((place) => (
          <Link
            to={`/place/${place.fsq_id}`}
            key={place.fsq_id}
            className="place-card"
          >
            <img
              src={place.photoUrl || defaultImg}
              alt="place"
              className="place-image"
            />
            <h3>{place.name}</h3>
            <p>
              📍 {place.location?.address}, {place.location?.locality}
            </p>
            {place.categories?.length > 0 && (
              <p className="category-tag">{place.categories[0].name}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Results;
