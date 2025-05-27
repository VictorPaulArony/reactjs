import React from "react";

// function component to display weather forecast
const Days = ({ days }) => {
  if (!days || days.length < 1) return null;

  const getDayName = (dateString) => {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return weekday[date.getDay()];
  };

  return (
    <div className="forecast-section">
      <div className="forecast-container">
        {days.map((day, index) => (
          <div key={index} className="card">
            <div>{getDayName(day.dt_txt)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
            <div>{Math.round(day.main.temp)}°C</div>
            <small>{day.weather[0].description}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Days;
