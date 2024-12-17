import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용

const KeywordChart = () => {
  const [data, setData] = useState({ name: 'root', children: [] }); // 초기 빈 트리 구조
  const [error, setError] = useState(null);
  const isMounted = useRef(true); // 마운트 상태 확인
  const navigate = useNavigate(); // React Router로 페이지 이동

  useEffect(() => {
    isMounted.current = true;

    // 서버 데이터 요청
    axios
      .get('/api/keywords/interesting')
      .then((response) => {
        if (isMounted.current) {
          // 서버 데이터를 트리 구조로 변환 및 색상 설정
          const transformedData = {
            children: response.data.map((keyword) => ({
              name: keyword.keywordName,
              value: keyword.interest || 1, // 관심도나 기본값 1
              color: keyword.emotion === 0 ? '#FF4D4D' : '#4D79FF', // 빨간색(0) 또는 파란색(1)
              keywordId: keyword.keywordId, // keywordId를 추가
            })),
          };
          setData(transformedData);
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          setError(error.message);
        }
      });

    return () => {
      isMounted.current = false; // 언마운트 시 플래그 변경
    };
  }, []);

  // 클릭 이벤트 핸들러: keywordId를 경로로 사용하여 페이지 이동
  const handleBubbleClick = (node) => {
    if (node.data.keywordId) {
      navigate(`/${node.data.keywordId}/keyword-details`); // 이동할 경로
    }
  };

  // 텍스트를 줄바꿈 처리하는 함수
  const splitText = (text, maxCharsPerLine) => {
    if (!text) return []; // text가 없으면 빈 배열 반환
    const result = [];
    for (let i = 0; i < text.length; i += maxCharsPerLine) {
      result.push(text.substring(i, i + maxCharsPerLine));
    }
    return result;
  };

  // `value`에 따라 최대 글자 수 설정
  const getMaxCharsPerLine = (value) => {
    if (value >= 60 && value <= 70) return 5; // value가 60~70이면 한 줄 최대 5글자
    return 4; // 그 외에는 한 줄 최대 4글자
  };

  if (error) {
    return <p>Error: {error}</p>; // 오류 메시지 표시
  }

  return (
    <div style={{ height: '800px' }}>
      {data.children.length > 0 ? (
        <ResponsiveCirclePacking
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          id="name"
          value="value"
          colors={(node) => node.data.color} // 각 노드의 color 속성 사용
          padding={4}
          labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          circleComponent={({ node }) => {
            const lines = splitText(
              node.data.name,
              getMaxCharsPerLine(node.data.value),
            );

            return (
              <g>
                <circle
                  cx={node.x} // 원의 x 좌표 설정
                  cy={node.y} // 원의 y 좌표 설정
                  r={node.radius} // 반지름 설정
                  fill={node.data.color}
                  onClick={() => handleBubbleClick(node)} // 클릭 이벤트 핸들러 추가
                  style={{ cursor: 'pointer' }}
                />
                {lines.map((line, index) => (
                  <text
                    key={index}
                    x={node.x}
                    y={node.y + index * 25 - (lines.length * 10) / 2} // 줄바꿈 간격 설정
                    textAnchor="middle"
                    dy="0.3em"
                    fill="white"
                    style={{ fontSize: '20px', fontWeight: 'bold' }} // 텍스트 스타일
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          }}
          borderWidth={2}
          borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default KeywordChart;
