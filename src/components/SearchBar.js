import React from 'react';

const SearchBar = ({ city, setCity, getWeather }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default SearchBar;
