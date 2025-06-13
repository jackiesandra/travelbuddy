import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import destinationImg from '../assets/images/destination.jpg';

function MainNavigation() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const goToResults = (category) => {
    if (!destination) {
      alert("Please enter a destination first.");
      return;
    }
    navigate(`/results?category=${category}&location=${destination}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Travel Buddy</h1>
        <input
          type="text"
          placeholder="🔍 Search Destination"
          className="search-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </header>

      <main className="main-layout">
        <div className="popular-destinations">
          <h3>Popular destinations</h3>
          <div className="image-box">
            <img
              src={destinationImg}
              alt="Popular destination"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        </div>

        <div className="nav-buttons">
          <button onClick={() => goToResults('places')}>Places</button>
          <button onClick={() => goToResults('restaurants')}>Restaurants</button>
          <button onClick={() => goToResults('map')}>Interactive map</button>
          <button onClick={() => goToResults('info')}>Destination info</button>
        </div>

        <div className="side-buttons">
          <button onClick={() => goToResults('hotels')}>Hotels</button>
          <button onClick={() => navigate('/itinerary')}>Itinerary</button>
          <button onClick={() => goToResults('suggestions')}>Suggestions</button>
        </div>
      </main>
    </div>
  );
}

export default MainNavigation;
