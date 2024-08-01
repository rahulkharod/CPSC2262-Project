import React, { useState } from 'react';
import './WeatherDetails.css';
import { roundTemperature } from '../utils';

const WeatherDetails = ({ weather, addFavorite }) => {
  const [message, setMessage] = useState('');

  const handleAddFavorite = () => {
    addFavorite(weather.name);
    setMessage(`${weather.name} has been added to your favorite cities.`);
    setTimeout(() => {
      setMessage('');
    }, 4000); 
  };

  const roundedTemp = roundTemperature(weather.main.temp);

  return (
    <div className="weather-details">
      <div className="weather-header">
        <h2>{weather.name}</h2>
        <p className="weather-temp">{roundedTemp}°C</p>
        <button className="add-favorite-button" onClick={handleAddFavorite}>Add to Favorites</button>
      </div>
      {message && <div className="message">{message}</div>}
      <div className="weather-info">
        <div className="weather-description">
          <p className="weather-main">{weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
