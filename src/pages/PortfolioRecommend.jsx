import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import RecommendStock from '../components/RecommendStock';
import Loading from '../components/Loading';

const PortfolioRecommend = () => {
  const [loading, setLoading] = useState(true);
  const portfolioRecommendApiUrl = `/api/portfolios/portfolio_recommend`;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <NavBar />
      <RecommendStock
        apiUrl={portfolioRecommendApiUrl}
        dataType="PortfolioStockResponseDTO"
      />
    </div>
  );
};

export default PortfolioRecommend;
