import React from 'react';
import Loading from '../components/Loading';
import { Box } from '@mui/material';

function LoadingPageTest() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Loading />
    </Box>
  );
}

export default LoadingPageTest;
