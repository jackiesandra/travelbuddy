import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaceDetails.css';
import InteractiveMap from '../components/InteractiveMap';
import { getWeatherByCoords } from '../api/weather';

const API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;

function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const detailRes = await axios.get(
          `https://api.foursquare.com/v3/places/${id}`,
          { headers: { Authorization: API_KEY } }
        );

        const photoRes = await axios.get(
          `https://api.foursquare.com/v3/places/${id}/photos`,
          { headers: { Authorization: API_KEY } }
        );

        const placeData = detailRes.data;
        setPlace(placeData);
        setPhotos(photoRes.data);

        const coords = placeData.geocodes?.main;
        if (coords) {
          const weatherData = await getWeatherByCoords(coords.latitude, coords.longitude);
          setWeather(weatherData);
        }
      } catch (error) {
        console.error('Error loading place details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!place) return <p>Place not found.</p>;

  return (
    <div className="place-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft style={{ marginRight: '8px' }} /> Back
      </button>

      <h2>{place.name}</h2>

      <p>
        📍{' '}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.location?.formatted_address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="place-map-link"
        >
          {place.location?.formatted_address}
        </a>
      </p>

      <p>🗂️ {place.categories?.map((c) => c.name).join(', ')}</p>

      {place.geocodes?.main && (
  <div className="map-wrapper">
    <h3>Map</h3>
    <InteractiveMap
      lat={place.geocodes.main.latitude}
      lon={place.geocodes.main.longitude}
    />
  </div>
)}

      {weather && (
        <div className="weather-box">
          <h3>Weather</h3>
          <img
            src={weather.icon}
            alt="Weather Icon"
            style={{ width: '60px', height: '60px' }}
          />
          <p>🌡️ Temp: {weather.temp}°C</p>
          <p>🌤️ {weather.description}</p>
        </div>
      )}

      <h3>Photos</h3>
      <div className="photo-grid">
        {photos.length > 0 ? (
          photos.map((photo, i) => (
            <img
              key={i}
              src={`${photo.prefix}original${photo.suffix}`}
              alt={`Photo ${i}`}
              className="place-photo"
            />
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>

      <button
        onClick={() => navigate(`/itinerary?place=${encodeURIComponent(place.name)}`)}
        className="itinerary-button"
      >
        📅 View Itinerary for {place.name}
      </button>
    </div>
  );
}

export default PlaceDetails;
