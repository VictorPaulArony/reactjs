import React, { useState } from 'react';
import './App.css';

// You can use a Vite environment variable here for safety

const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY)


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      // ✅ Use the correct full API endpoint
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      // ✅ Parse JSON response safely
      const data = await response.json();
      console.log("Weather data:", data);

      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className='app-bg'>
    <div className="app">
      <h1>Weather App</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
