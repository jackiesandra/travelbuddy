import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWeatherByCity } from '../api/weather';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Itinerary.css';

function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const place = searchParams.get('place');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      if (place) {
        const data = await getWeatherByCity(place);
        setWeather(data);
      }
    }
    fetchWeather();
  }, [place]);

  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem('userItinerary');
    return saved
      ? JSON.parse(saved)
      : [
          { id: '1', time: '09:00 AM', activity: '🗺️ Visit the main attraction' },
          { id: '2', time: '11:00 AM', activity: '☕ Coffee break' },
          { id: '3', time: '01:00 PM', activity: '🍽️ Lunch at a traditional restaurant' },
          { id: '4', time: '03:00 PM', activity: '🏛️ Explore museums or historical sites' },
          { id: '5', time: '06:00 PM', activity: '🌳 Relax in a park or plaza' },
          { id: '6', time: '08:00 PM', activity: '🌆 Dinner and nightlife' },
        ];
  });

  useEffect(() => {
    localStorage.setItem('userItinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(itinerary);
    const [moved] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, moved);

    setItinerary(updatedItems);
    localStorage.setItem('userItinerary', JSON.stringify(updatedItems));
  };

  return (
    <div className="place-detail-container">
      <h2 className="page-title">Your Itinerary</h2>

      <div className="content-grid">
        {weather && (
          <div className="weather-box">
            <h4>Weather in {weather.city}</h4>
            <p>{weather.temp}°C – {weather.description}</p>
            <img src={weather.icon} alt="Weather icon" style={{ width: '60px' }} />
          </div>
        )}

        <div className="itinerary-container">
          <h3>Suggested Itinerary</h3>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="itinerary">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="itinerary-list"
                >
                  {itinerary.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-item"
                        >
                          <strong>{item.time}</strong> – {item.activity}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default ItineraryPage;
