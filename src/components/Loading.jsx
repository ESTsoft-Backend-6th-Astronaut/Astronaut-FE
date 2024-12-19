import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography } from '@mui/material';

import logoImage from '../assets/rocketicon.gif';

const Loading = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/random-quote`)
      .then((response) => {
        console.log('API response:', response.data); // 데이터 확인
        setQuote(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('명언을 가져오는 중 오류가 발생했습니다:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="10vh"
      >
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          로딩 중...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <iframe
        src="https://lottie.host/embed/68c757a2-ac86-4789-ab7f-1adb333216b5/L0A4eD16Ea.lottie"
        style={{
          border: 'none',
          width: '400',
          height: '400',
        }}
        title="Loading Animation"
      ></iframe>
      {quote && (
        <>
          <Typography
            variant="h6"
            style={{ marginBottom: '1rem', marginTop: '3rem' }}
          >
            &quot;{quote.quoteContent}&quot;
          </Typography>
          <Typography variant="subtitle1">- {quote.quoteAuthor}</Typography>
        </>
      )}
    </Box>
  );
};

export default Loading;
