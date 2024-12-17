import React, { useEffect } from 'react';
import axios from 'axios';

import { styled } from '@mui/system';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const StyledPaper = styled(Paper)({
  padding: '2rem',
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)({
  marginTop: '1rem',
  padding: '0.7rem 1.5rem',
  fontSize: '1rem',
  textTransform: 'none',
});

export default function SimpleLogin() {
  const origin = window.location.origin;

  const KAKAO_CLIENT_ID = '81bc0ad2d93a08a2bd006f342b98f29f';
  const KAKAO_REDIRECT_URI = `${origin}/login/kakao/callback`;

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };

  // 네이버 로그인 핸들러
  const handleNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=YOUR_NAVER_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code`;
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <StyledPaper elevation={3} sx={{ marginTop: '-14rem' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            간편 로그인
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            간편하게 로그인하고 서비스를 이용해보세요.
          </Typography>
          {/* 카카오 로그인 버튼 */}
          <StyledButton
            variant="contained"
            fullWidth
            style={{ backgroundColor: '#FEE500', color: '#000000' }}
            onClick={handleKakaoLogin}
          >
            카카오 로그인
          </StyledButton>
          {/* 네이버 로그인 버튼 */}
          <StyledButton
            variant="contained"
            fullWidth
            style={{ backgroundColor: '#03C75A', color: '#FFFFFF' }}
            onClick={handleNaverLogin}
          >
            네이버 로그인
          </StyledButton>
        </StyledPaper>
      </Box>
    </Container>
  );
}
