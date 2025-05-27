import React from "react";

// function component to search for a city
const CitySearch = ({ city, onCityChange, onSearch }) => {
  return (
    <div className="city-search">
      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default CitySearch;
