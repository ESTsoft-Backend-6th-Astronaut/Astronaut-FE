import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Chip, Typography, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

const RecommendStock = ({ keywordId }) => {
  const [recommendStocks, setRecommendStocks] = useState([]);

  // 추천 종목 가져오기
  const fetchRecommendStocks = async () => {
    if (keywordId) {
      try {
        const response = await axios.get(
          `/api/keywords/${keywordId}/recommend`,
        );

        // 추천 종목 데이터를 상태에 저장
        setRecommendStocks(response.data);
      } catch (error) {
        console.error('추천 종목 조회 오류:', error);
      }
    }
  };

  useEffect(() => {
    if (keywordId) {
      // 키워드 id가 변경되면 추천 종목 가져오기
      fetchRecommendStocks();
    }
  }, [keywordId]);

  return (
    <div>
      <Box sx={{ width: '100%', height: '500px', overflow: 'visible' }}>
        <Swiper
          spaceBetween={15}
          slidesPerView={4.5}
          centeredSlides={true}
          pagination={{ clickable: true }}
          style={{ overflow: 'visible' }}
        >
          {recommendStocks.map((stock) => (
            <SwiperSlide key={stock.recommendStockId}>
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
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {stock.stockName}
                  </Typography>
                  <Typography variant="body2" color="text.Secondary">
                    {stock.reason}
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
                  {/* 시가 받아오도록 수정 */}
                  <Chip
                    label={'시가 : ' + stock.stockPrice}
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
