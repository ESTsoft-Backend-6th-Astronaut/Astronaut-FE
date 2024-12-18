import React from 'react';
import PortfolioChart from '../components/PortfolioChart';
import PortfolioList from '../components/PortfolioList';
import KeywordChart from '../components/KeywordChart';
import KeywordRank from '../components/KeywordRank';
import NavBar from '../components/NavBar';
import { Box } from '@mui/material';

function Main() {
  return (
    <>
      {/* 네비게이션 바 */}
      <NavBar />

      {/* 상단 섹션: KeywordChart와 KeywordRank */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // 가운데 정렬
          alignItems: 'flex-start',
          gap: 4, // 간격 설정
          mt: 4, // 위 여백 추가
        }}
      >
        <Box sx={{ flex: 1, maxWidth: '45%' }}>
          <KeywordChart />
        </Box>
        <Box sx={{ flex: 1, maxWidth: '45%' }}>
          <KeywordRank />
        </Box>
      </Box>

      {/* 하단 섹션: PortfolioChart와 PortfolioList */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // 가운데 정렬
          alignItems: 'flex-start',
          gap: 4, // 간격 설정
          mt: 20, // 위 여백 추가
        }}
      >
        <Box sx={{ flex: 1, maxWidth: '45%' }}>
          <PortfolioChart />
        </Box>
        <Box sx={{ flex: 1, maxWidth: '45%' }}>
          <PortfolioList />
        </Box>
      </Box>
    </>
  );
}

export default Main;
