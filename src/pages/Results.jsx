import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchPlaces } from '../api/foursquare'; // Este archivo debes crearlo
import defaultImg from '../assets/images/default.jpg';
import './Results.css';

function Results() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="results-container">
      <h2>Results for "{category}" in {location}</h2>

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
