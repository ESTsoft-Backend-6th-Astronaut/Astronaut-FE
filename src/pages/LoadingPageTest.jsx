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
      <iframe
        src="https://lottie.host/embed/68c757a2-ac86-4789-ab7f-1adb333216b5/L0A4eD16Ea.lottie"
        style={{ border: 'none', width: '300px', height: '300px' }}
        title="Loading Animation"
      ></iframe>
      <Loading />
    </Box>
  );
}

export default LoadingPageTest;
