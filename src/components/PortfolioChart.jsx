import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

function PortfolioChart() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('/api/portfolios/current_price', {
        headers: token ? { token: token } : undefined,
      })
      .then((response) => {
        const totalValue = response.data
          .map((item) => parseInt(item.currentTotalPrice.replace(/,/g, ''), 10))
          .reduce((a, b) => a + b, 0);

        const transformedData = response.data.map((item, index) => {
          const value = parseInt(item.currentTotalPrice.replace(/,/g, ''), 10);
          const percent = ((value / totalValue) * 100).toFixed(0);
          return {
            id: index,
            value,
            label: `${item.stockName}(${percent}%)`,
          };
        });
        setData(transformedData);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  // 데이터가 없을 때 메시지 출력
  if (data && data.length === 0) {
    return <h2>아직 입력한 포트폴리오가 없습니다.</h2>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {data ? (
        <PieChart
          series={[
            {
              data,
              innerRadius: 120,
            },
          ]}
          width={800}
          height={300}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PortfolioChart;
