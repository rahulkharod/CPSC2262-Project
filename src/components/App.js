import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import Weather from './Weather';
import FavoriteCities from './FavoriteCities';
import About from './About';
import '../App.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/favorites" element={<FavoriteCities />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  </Router>
);

export default App;
