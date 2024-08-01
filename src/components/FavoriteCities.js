import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FavoriteCities.css';
import { roundTemperature } from '../utils';

const FavoriteCities = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [weatherData, setWeatherData] = useState([]);
  const apiKey = 'c23a64f524c9b3333f54775540da1a31'; 

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(
        favorites.map(async (city) => {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          return response.data;
        })
      );
      setWeatherData(data);
    };

    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites, apiKey]);

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const getBackgroundImage = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return 'url(/sunny.jpg)';
      case 'Rain':
        return 'url(/rainy.jpg)';
      case 'Clouds':
        return 'url(/cloudy.jpg)';
      default:
        return 'url(/default.jpg)';
    }
  };
  return (
    <div className="favorite-cities">
      <p><h1> Favorites Cities({favorites.length})</h1></p>
      {weatherData.length === 0 && <p>No favorite cities. Add from home page.</p>}
      <ul>
        {weatherData.map((cityWeather, index) => (
          <li 
            key={index} 
            className="favorite-city" 
            style={{ backgroundImage: getBackgroundImage(cityWeather.weather[0].main) }}
          >
            <h2>{cityWeather.name}</h2>
            <p>{roundTemperature(cityWeather.main.temp)}°C</p>
            <button onClick={(e) => { e.stopPropagation(); removeFavorite(cityWeather.name); }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
