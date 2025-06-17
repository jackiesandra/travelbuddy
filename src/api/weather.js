const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    return {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}
export async function getWeatherByCity(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    return {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    return null;
  }
}
