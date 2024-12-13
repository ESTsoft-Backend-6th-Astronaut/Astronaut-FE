import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

function PortfolioChart() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/portfolios/current_price')
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

  return (
    <div>
      <h1>나의 주식 포트폴리오</h1>
      {data ? (
        <PieChart
          series={[
            {
              data,
              innerRadius: 75,
            },
          ]}
          width={500}
          height={200}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PortfolioChart;
