import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaceDetails.css';

const API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;

function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const detailRes = await axios.get(
          `https://api.foursquare.com/v3/places/${id}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        const photoRes = await axios.get(
          `https://api.foursquare.com/v3/places/${id}/photos`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        setPlace(detailRes.data);
        setPhotos(photoRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading place details:', error);
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
    </div>
  );
}

export default PlaceDetails;
