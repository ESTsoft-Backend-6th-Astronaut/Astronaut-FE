import React from 'react';
import NavBar from '../components/NavBar';
import KeywordChart from '../components/KeywordChart';
import KeywordRank from '../components/KeywordRank';

const KeywordPage = () => {
  return (
    <>
      <NavBar />
      <div style={{ padding: '0 200px 50px 200px' }}>
        <div style={{ marginBottom: '100px' }}>
          <KeywordChart />
        </div>
        <KeywordRank />
      </div>
    </>
  );
};

export default KeywordPage;
