import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import StockDetailTable from './StockDetailTable';

const RecommendStock = ({ apiUrl, dataType }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false); // 모달 열림 상태 관리
  const [selectedStock, setSelectedStock] = useState(null); // 선택된 주식 정보

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
      } else if (dataType === 'PortfolioStockResponseDTO') {
        mappedData = response.data.map((item) => ({
          id: item.stockCode, // 일단 종목번호로 넣어둠 : 종목번호로 묶이도록
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

  // 카드 클릭 시 모달 열기
  const handleCardClick = (stock) => {
    setSelectedStock(stock);
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
    setSelectedStock(null);
  };

  const formatNumber = (number) => {
    return Number(number).toLocaleString();
  };

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
                onClick={() => handleCardClick(item)} // 카드 클릭 시 모달 열기
                sx={{
                  maxWidth: 350,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  // paddingBottom: '15px',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 500 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mt: 1 }}
                  >
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
                    label={'시가 : ₩' + formatNumber(item.stockPrice)}
                    color="default"
                    size="small"
                  />
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 팝업창(Dialog) */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedStock?.title} 상세 정보</DialogTitle>
        <DialogContent>
          {/* StockDetailTable 컴포넌트 렌더링 */}
          <StockDetailTable stockId={selectedStock?.id} dataType={dataType} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RecommendStock;
