import React from 'react';
import KeywordNews from '../components/KeywordNews';
import RecommendStock from '../components/RecommendStock';
import RecommendStockSearchVolume from '../components/RecommendStockSearchVolume';
import { useParams } from 'react-router-dom';

const KeywordDetails = () => {
  const { keyword_id } = useParams();

  return (
    <div>
      <KeywordNews />
      <RecommendStockSearchVolume keywordId={keyword_id} />
      <RecommendStock keywordId={keyword_id} />
    </div>
  );
};

export default KeywordDetails;
