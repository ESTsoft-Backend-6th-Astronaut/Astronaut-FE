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
import { createTheme } from '@mui/material';
import KeywordPage from './pages/KeywordPage';
import Loading from './pages/LoadingPageTest';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif;', // 전체 폰트 설정
  },
});

function App() {
  return (
    <div style={{ minWidth: '1092px' }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/kakao/callback" element={<KakaoCallback />} />
        <Route path="/stock/:stock-id" element={<StockDetails />} />
        <Route path="/main" element={<Main />} />
        {/*  여기로 들어가기 */}
        <Route path="/keyword" element={<KeywordPage />} />
        <Route path="/keyword/:keyword_id" element={<KeywordDetails />} />
        <Route path="/stock-details" element={<StockDetails />} />
        {/* /:keyword_id가 URL파라미터로 keyword_id를 받음 */}
        <Route
          path="/keyword/:keyword_id/search-volume"
          element={<RecommendStockSearchVolume />}
        />
        <Route
          path="/keyword/:keyword_id/recommend-stock"
          element={<RecommendStock />}
        />
        <Route
          path="/keyword/:keyword_id/popular-keyword"
          element={<Keyword />}
        />
        <Route path="/keyword/:keyword_id/news" element={<KeywordNews />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/recommend" element={<PortfolioRecommend />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
