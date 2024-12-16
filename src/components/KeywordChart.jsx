import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bubble } from 'react-chartjs-2';
import 'chart.js/auto';
import './KeywordChart.css';

const KeywordChart = () => {
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/keywords/interesting')
      .then((response) => {
        setKeywords(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  // interest의 최대값을 찾기
  const maxInterest = Math.max(...keywords.map(keyword => keyword.interest));

  // 색상 배열 생성
  const colors = keywords.map(keyword => {
    if (keyword.interest === maxInterest) {
      return 'rgba(255, 0, 0, 0.6)'; // 최대값을 빨간색으로 설정
    }
    // 다른 색상들 (예: 파란색, 초록색, 노란색 등)
    const randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
    return randomColor;
  });

  // 버블 차트 데이터 생성
  const bubbleData = {
    datasets: keywords.map((keyword, index) => ({
      label: keyword.keywordName,
      data: [{ x: index, y: keyword.ranking, r: (keyword.interest / maxInterest) * 100 }],
      backgroundColor: colors[index],
    })),
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">AI이슈포착</h2>
      <Bubble data={bubbleData} />
    </div>
  );
};

export default KeywordChart;