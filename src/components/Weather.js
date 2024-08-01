import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import WeatherDetails from './WeatherDetails';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const apiKey = 'c23a64f524c9b3333f54775540da1a31'; 

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('City not found ');
      setWeather(null);
    }
  };
  

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const getBackgroundImage = () => {
    if (!weather) return '';
    const weatherType = weather.weather[0].main.toLowerCase();
    let imageUrl = '';
    switch (weatherType) {
      case 'clear':
        imageUrl = 'url(/sunny.jpg)';
        break;
      case 'rain':
        imageUrl = 'url(/rainy.jpg)';
        break;
      case 'clouds':
        imageUrl = 'url(/cloudy.jpg)';
        break;
        case 'haze':
            imageUrl = 'url(/haze.jpg)';
        break;
      default:
        imageUrl = '';
    }
    console.log('Background Image URL:', imageUrl); 
    return imageUrl;
  };

  return (
    <div className="weather-app" style={{ backgroundImage: getBackgroundImage() }}>
      <h1>Weather-Check</h1>
      <SearchBar city={city} setCity={setCity} getWeather={getWeather} />
      {error && <p>{error}</p>}
      {weather && <WeatherDetails weather={weather} addFavorite={addFavorite} />}
    </div>
  );
};

export default Weather;
