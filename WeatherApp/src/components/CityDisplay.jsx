import React from "react";

// function component to display weather forecast
const CityDisplay = ({ city, today }) => {
  if (!city || !today) return null;

  const { name, country } = city;
  const { weather, main } = today;

  return (
    <div className="city-display">

      <div className="weather-info card">
        <h2>{name}, {country}</h2>
        <p><strong>Condition:</strong> {weather[0].description}</p>
        <p><strong>🌡️ Temp:</strong> {Math.round(main.temp)}°C</p>
        <p><strong>Feels Like:</strong> {Math.round(main.feels_like)}°C</p>
        <p><strong>Min/Max:</strong> {Math.round(main.temp_min)}°C / {Math.round(main.temp_max)}°C</p>
        <p><strong>Humidity:</strong> {main.humidity}%</p>
        <p><strong>Pressure:</strong> {main.pressure} hPa</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
};

export default CityDisplay;
