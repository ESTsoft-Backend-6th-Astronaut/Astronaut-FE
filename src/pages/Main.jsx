import React, { useEffect, useState } from 'react';
import PortfolioChart from '../components/PortfolioChart';
import PortfolioList from '../components/PortfolioList';
import KeywordChart from '../components/KeywordChart';
import KeywordRank from '../components/KeywordRank';
import NavBar from '../components/NavBar';
import { Box, Typography } from '@mui/material';
import Loading from '../components/Loading';

function Main() {
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
    <>
      {/* 네비게이션 바 */}
      <NavBar />
      <div style={{ padding: '0 200px 50px 200px' }}>
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
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 4,
              mt: 20,
              filter: user ? 'none' : 'blur(4px)',
              transition: 'filter 0.3s',
            }}
          >
            <Box sx={{ flex: 1, maxWidth: '45%' }}>
              <PortfolioChart />
            </Box>
            <Box sx={{ flex: 1, maxWidth: '45%' }}>
              <PortfolioList />
            </Box>
          </Box>
          {!user && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  backdropFilter: 'blur(2px)', // 글자 주변 흐림 효과
                  padding: '10px 20px',
                  borderRadius: '8px',
                  bgcolor: 'rgba(0, 0, 0, 0.6)', // 메시지 배경
                }}
              >
                로그인이 필요합니다
              </Typography>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}

export default Main;
