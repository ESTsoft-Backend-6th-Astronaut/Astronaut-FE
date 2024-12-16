import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import KeywordDetails from './pages/KeywordDetails';
import StockDetails from './pages/StockDetails';
import Main from './pages/Main';
import Portfolio from './pages/Portfolio';
const Home = () => <h1>Home Page</h1>;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/keyword-details" element={<KeywordDetails />} />
        <Route path="/stock-details" element={<StockDetails />} />
        <Route path="/main" element={<Main />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
