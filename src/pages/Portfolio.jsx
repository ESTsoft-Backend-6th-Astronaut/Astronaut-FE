import React, { useState } from 'react';
import PortfolioTable from '../components/PortfolioTable';
import RecommendPortfolio from '../components/RecommendPortfolio';
import PortfolioChart from '../components/PortfolioChart';
import { Box, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import BlurModal from '../components/BlurModal';

function Portfolio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <NavBar />
      <BlurModal isLoggedIn={isLoggedIn}>
        <div
          style={{
            paddingLeft: '200px',
            paddingRight: '200px',
            paddingBottom: '200px',
          }}
        >
          <h1
            style={{
              marginLeft: '200px',
              marginRight: 'auto',
              paddingBottom: '50px',
            }}
          >
            나의 주식 포트폴리오
          </h1>
          {/* Chart와 Recommendation을 가로로 배치 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between', // 공간을 균등하게 분배
              gap: 2, // 컴포넌트 간 간격
              mb: 30, // 아래 Table과의 간격
              width: '100%', // 부모 Box의 가로 크기를 100%로 설정
              maxWidth: 1500, // 최대 너비 제한
              margin: '0 auto', // 화면 가운데 정렬
              alignItems: 'center',
              paddingX: 'auto',
            }}
          >
            {/* PortfolioChart */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '50%',
              }}
            >
              <PortfolioChart />
            </Box>

            {/* RecommendPortfolio */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '50%',
              }}
            >
              <RecommendPortfolio />
            </Box>
          </Box>

          {/* Table */}
          <Box>
            <PortfolioTable />
          </Box>
        </div>
      </BlurModal>
    </div>
  );
}

export default Portfolio;
