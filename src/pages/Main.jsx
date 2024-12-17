import React from 'react';
import PortfolioChart from '../components/PortfolioChart';
import PortfolioList from '../components/PortfolioList';
import KakaoLogin from '../components/KakaoLogin';
import KeywordChart from '../components/KeywordChart';
import KeywordRank from '../components/KeywordRank';

function Main() {
  return (
    <div style={{ display: 'flex' }}>
      <KeywordRank />
      <KeywordChart />
      <PortfolioChart />
      <PortfolioList />
    </div>
  );
}

export default Main;
