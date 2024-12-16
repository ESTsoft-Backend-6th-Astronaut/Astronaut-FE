import React from 'react';
import NavBar from '../components/NavBar';
import RecommendStock from '../components/RecommendStock';
import KeywordNews from '../components/KeywordNews';

const PortfolioRecommend = () => {
  const portfolioRecommendApiUrl = `/api/portfolios/portfolio_recommend`;

  return (
    <div>
      <NavBar />
      <RecommendStock
        apiUrl={portfolioRecommendApiUrl}
        dataType="PorfolioStockResponseDTO"
      />
      <KeywordNews />
    </div>
  );
};

export default PortfolioRecommend;
