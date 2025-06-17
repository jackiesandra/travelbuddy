import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavigation from './pages/MainNavigation';
import Results from './pages/Results';
import PlaceDetails from './pages/PlaceDetails';
import ItineraryPage from './pages/Itinerary';
import Hotels from './pages/Hotels';
import Suggestions from './pages/Suggestions'; 
import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainNavigation />} />
        <Route path="/results" element={<Results />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/suggestions" element={<Suggestions city="New York" />} />
      </Routes>
    </Router>
  );
}

export default App;
