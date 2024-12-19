import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography } from '@mui/material';

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
      height="10vh"
    >
      {quote && (
        <>
          <Typography variant="h6" style={{ marginBottom: '1rem' }}>
            &quot;{quote.quoteContent}&quot;
          </Typography>
          <Typography variant="subtitle1">- {quote.quoteAuthor}</Typography>
        </>
      )}
    </Box>
  );
};

export default Loading;
