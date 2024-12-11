import React from 'react';
import PortfolioChart from '../components/PortfolioChart';
import PortfolioList from '../components/PortfolioList';

function Main() {
  return (
    <div style={{ display: 'flex' }}>
      <PortfolioChart />
      <PortfolioList />
    </div>
  );
}

export default Main;
