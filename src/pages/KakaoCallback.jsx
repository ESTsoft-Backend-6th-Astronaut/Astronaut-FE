import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function KakaoCallback() {
  const redirectUri = window.location.origin + window.location.pathname;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `/api/oauth/kakao?code=${searchParams.get('code')}&redirectUri=${redirectUri}`,
      )
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        navigate('/');
      });
  }, []);

  return (
    <Container>
      <Typography>로그인 처리 중입니다.</Typography>
    </Container>
  );
}
