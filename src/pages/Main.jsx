import React from 'react';
import PortfolioChart from '../components/PortfolioChart';
import PortfolioList from '../components/PortfolioList';
import KeywordChart from '../components/KeywordChart';
import KeywordRank from '../components/KeywordRank';
import NavBar from '../components/NavBar';

function Main() {
  return (
    <>
      <NavBar />
      <KeywordRank />
      <KeywordChart />
      <PortfolioChart />
      <PortfolioList />
    </>
  );
}

export default Main;
