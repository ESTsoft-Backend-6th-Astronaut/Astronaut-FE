import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RecommendPortfolio() {
  const [portfolios, setPortfolios] = useState([]); // 포트폴리오 데이터
  const [isRecommended, setIsRecommended] = useState(false); // 오늘 종목 추천 여부
  const [loading, setLoading] = useState(true); // 로딩 상태

  const navigate = useNavigate();

  // API 호출
  const fetchData = async () => {
    try {
      // 포트폴리오 조회
      const portfolioResponse = await axios.get('/api/portfolios');
      setPortfolios(portfolioResponse.data);

      // 추천 여부 확인
      const recommendResponse = await axios.get('/api/portfolios/is_recommend');
      setIsRecommended(recommendResponse.data?.data || false);

      setLoading(false); // 로딩 완료
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  const BoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // 부모 컨테이너의 전체 높이를 사용
    minWidth: '280px',
  };

  // 포트폴리오가 등록되어 있지 않은 경우
  if (portfolios.length === 0) {
    return (
      <Box sx={BoxStyle}>
        <Typography variant="h6">AI가 추천하는 주식 종목</Typography>
        <Typography>보유 주식에 어울리는 종목을 추천해드려요</Typography>
        <Typography sx={{ mt: 2 }}>포트폴리오를 먼저 등록해주세요.</Typography>
      </Box>
    );
  }

  // 포트폴리오가 등록되어 있고, 오늘 종목 추천을 받지 않은 경우
  if (!isRecommended) {
    return (
      <Box sx={{ ...BoxStyle, cursor: 'pointer' }}>
        <Typography variant="h6">AI가 추천하는 주식 종목</Typography>
        <Box onClick={() => navigate('/portfolio/recommend')}>
          <Typography>보유 주식에 어울리는 종목을 추천해드려요</Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2, width: '235px' }}
          onClick={() => navigate('/portfolio/recommend')}
        >
          AI 종목 추천(1일 1회)
        </Button>
      </Box>
    );
  }

  // 포트폴리오가 등록되어 있고, 오늘 종목 추천을 받은 경우
  return (
    <Box sx={BoxStyle}>
      <Typography variant="h6">AI가 추천하는 주식 종목</Typography>
      <Typography>보유 주식에 어울리는 종목을 추천해드려요</Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, width: '235px', borderRadius: '10px' }}
        onClick={() => navigate('/portfolio/recommend')}
      >
        추천 결과 보러가기
      </Button>
    </Box>
  );
}

export default RecommendPortfolio;
