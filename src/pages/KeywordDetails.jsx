import React from 'react';
import KeywordNews from '../components/KeywordNews';
import RecommendStock from '../components/RecommendStock';
import RecommendStockSearchVolume from '../components/RecommendStockSearchVolume';
import { useParams } from 'react-router-dom';

const KeywordDetails = () => {
  const { keyword_id } = useParams();
  const recommendStockApiUrl = `/api/keywords/${keyword_id}/recommend`;

  return (
    <div>
      <KeywordNews />
      <RecommendStockSearchVolume keywordId={keyword_id} />
      <RecommendStock
        keywordId={keyword_id}
        apiUrl={recommendStockApiUrl}
        dataType="RecommendKeywordStockDTO"
      />
    </div>
  );
};

export default KeywordDetails;
