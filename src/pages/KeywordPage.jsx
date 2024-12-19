import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import KeywordChart from '../components/KeywordChart';
import KeywordRank from '../components/KeywordRank';
import Loading from '../components/Loading';

const KeywordPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로딩 로직
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <Loading />
  ) : (
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
