import React from 'react';
import KeywordNews from '../components/KeywordNews';
import RecommendStock from '../components/RecommendStock';
import RecommendStockSearchVolume from '../components/RecommendStockSearchVolume';
import { useParams } from 'react-router-dom';
import Keyword from '../components/Keyword';
import NavBar from '../components/NavBar';

const KeywordDetails = () => {
  const { keyword_id } = useParams();
  const recommendStockApiUrl = `/api/keywords/${keyword_id}/recommend`;

  return (
    <div>
      <NavBar />
      <div
        style={{
          paddingLeft: '200px',
          paddingRight: '200px',
        }}
      >
        <Keyword keywordId={keyword_id} />
        <KeywordNews keywordId={keyword_id} />
        <RecommendStockSearchVolume keywordId={keyword_id} />
        <RecommendStock
          keywordId={keyword_id}
          apiUrl={recommendStockApiUrl}
          dataType="RecommendKeywordStockDTO"
        />
      </div>
    </div>
  );
};

export default KeywordDetails;
