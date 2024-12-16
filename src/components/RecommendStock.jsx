import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Chip, Typography, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

const RecommendStock = ({ apiUrl, dataType }) => {
  const [data, setData] = useState([]);

  // 포트폴리오 추천에도 사용할 수 있도록 수정

  // 추천 종목 가져오기
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);

      // 데이터 매핑 후 상태에 저장
      // 키워드 관련 추천 종목/포트폴리오 관련 추천 종목 각각 매핑되게
      let mappedData = [];

      // 키워드 추천 주식
      if (dataType === 'RecommendKeywordStockDTO') {
        mappedData = response.data.map((item) => ({
          id: item.recommendStockId,
          title: item.stockName,
          content: item.reason,
          stockPrice: item.stockPrice,
        }));
        // 포트폴리오 추천 주식
      } else if (dataType === 'PorfolioStockResponseDTO') {
        mappedData = response.data.map((item) => ({
          id: item.stockCode, // 일단 종목번호로 넣어둠 : 종목번호로 묶이도록록
          title: item.stockName,
          content: item.reason,
          stockPrice: item.stockPrice,
        }));
      }

      setData(mappedData);
    } catch (error) {
      console.error('데이터 조회 오류:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, dataType]);

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '500px',
          overflow: 'visible',
          marginTop: '40px',
        }}
      >
        <Swiper
          spaceBetween={15}
          slidesPerView={4.5}
          centeredSlides={true}
          pagination={{ clickable: true }}
          style={{ overflow: 'visible' }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                sx={{
                  maxWidth: 350,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  paddingBottom: '20px',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.Secondary">
                    {item.content}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 1,
                    pb: 2,
                    px: 2,
                  }}
                >
                  <Chip
                    label={'시가 : ₩' + item.stockPrice}
                    color="default"
                    size="small"
                  />
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
};
export default RecommendStock;
