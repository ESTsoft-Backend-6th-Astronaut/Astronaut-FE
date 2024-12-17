import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import KeywordDetails from './pages/KeywordDetails';
import StockDetails from './pages/StockDetails';
import Main from './pages/Main';
import RecommendStockSearchVolume from './components/RecommendStockSearchVolume';
import RecommendStock from './components/RecommendStock';
import Portfolio from './pages/Portfolio';
import PortfolioRecommend from './pages/PortfolioRecommend';
import Keyword from './components/Keyword';
import KeywordNews from './components/KeywordNews';
import KakaoCallback from './pages/KakaoCallback';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/kakao/callback" element={<KakaoCallback />} />
        <Route path="/stock-details" element={<StockDetails />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/:keyword_id/keyword-details"
          element={<KeywordDetails />}
        />
        <Route path="/stock-details" element={<StockDetails />} />
        {/* /:keyword_id가 URL파라미터로 keyword_id를 받음 */}
        <Route
          path="/:keyword_id/search-volume"
          element={<RecommendStockSearchVolume />}
        />
        <Route
          path="/:keyword_id/recommend-stock"
          element={<RecommendStock />}
        />
        <Route path="/:keyword_id/popular-keyword" element={<Keyword />} />
        <Route path="/:keyword_id/news" element={<KeywordNews />} />
        <Route path="/portfolio-recommend" element={<PortfolioRecommend />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
