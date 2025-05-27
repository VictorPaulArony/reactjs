import React, { useEffect, useState } from 'react';
import Days from './components/Days';
import CityDisplay from './components/CityDisplay';
import CitySearch from './components/CitySearch';
import './App.css';


const API_KEY = import.meta.env.VITE_API_KEY;

// Function to get daily forecasts from the weather data
const getDailyForecasts = (list) => {
  const result = [];
  const map = new Map();

  list.forEach(entry => {
    const [date, time] = entry.dt_txt.split(' ');

    if (time === "12:00:00" && !map.has(date)) {
      map.set(date, entry);
    }
  });

  for (let [, entry] of map.entries()) {
    if (result.length < 4) result.push(entry);
  }

  return result;
};

// Main App component 
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [days, setDays] = useState([]);

  // Function to fetch weather data
  const fetchWeather = async (cityName = city) => {
    if (!cityName) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      console.log("Weather data:", data);

      setWeather(data);
      const forecastDays = getDailyForecasts(data.list);
      setDays(forecastDays);
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

  // Fetch weather data when the component mounts
useEffect(() => {
  fetchWeather("kisumu");
}, []);

  return (
    <>
      <CitySearch city={city} onCityChange={setCity} onSearch={handleSearch} />

      <div className='app-bg'>
        <div className="app">
          <h1>Weather App</h1>

          {error && <p className="error">{error}</p>}

          {weather && days.length > 0 && (
            <CityDisplay city={weather.city} today={days[0]} />
          )}

          <Days days={days} />
        </div>
      </div>
    </>
  );
}

export default App;
