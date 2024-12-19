import React, { useEffect, useState } from 'react';
import PortfolioTable from '../components/PortfolioTable';
import RecommendPortfolio from '../components/RecommendPortfolio';
import PortfolioChart from '../components/PortfolioChart';
import { Box, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { Padding } from '@mui/icons-material';
import Loading from '../components/Loading';

function Portfolio() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (username && email) {
      setUser({ username, email });
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <NavBar />
      <div
        style={{
          paddingLeft: '200px',
          paddingRight: '200px',
          paddingBottom: '200px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          나의 주식 포트폴리오
        </Typography>
        {!user && (
          <Typography variant="body1" sx={{ color: 'gray' }}>
            로그인을 하시고 나만의 포트폴리오를 관리하세요.
          </Typography>
        )}

        {/* Chart와 Recommendation을 가로로 배치 */}
        <Box
          sx={{
            position: 'relative',

            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 4,
            mt: 20,
            filter: user ? 'none' : 'blur(3px)',
            pointerEvents: user ? 'auto' : 'none',
            transition: 'filter 0.3s',
          }}
        >
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

          <Box>
            <PortfolioTable />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Portfolio;
