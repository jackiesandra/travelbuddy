import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuggestions } from '../api/foursquare';
import destinationImg from '../assets/images/destination.jpg';

function MainNavigation() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length > 2) {
        const results = await getSuggestions(destination);
        console.log(results); // 👈 Para confirmar estructura
        // Aseguramos que solo se guarden strings para renderizar
        setSuggestions(results.map((s) => s.text?.primary || ''));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [destination]);

  const handleSuggestionClick = (text) => {
    setDestination(text);
    setShowSuggestions(false);
  };

  const goToResults = (category) => {
    if (!destination) {
      alert('Please enter a destination first.');
      return;
    }
    navigate(`/results?category=${category}&location=${destination}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Travel Buddy</h1>
        <div className="autocomplete-container">
          <input
            type="text"
            placeholder="🔍 Search Destination"
            className="search-input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => destination.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((text, i) => (
                <li key={i} onClick={() => handleSuggestionClick(text)}>
                  {text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <main className="main-layout">
        <div className="popular-destinations">
          <h3>Popular destinations</h3>
          <div className="image-box">
            <img
              src={destinationImg}
              alt="Popular destination"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
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
