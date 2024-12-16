import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function StockSearchDialog({ open, onClose, onStockSelect }) {
  const [query, setQuery] = useState('');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return; // 빈 입력 방지
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/stock', { params: { query } });
      setStocks(response.data.data || []); // 서버에서 받아온 주식 목록 저장
    } catch (err) {
      setError('검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleStockClick = (stock) => {
    onStockSelect(stock); // 부모 컴포넌트에 선택된 주식 정보 전달
    onClose(); // 다이얼로그 닫기
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableAutoFocus={true}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // 수직 정렬
      }}
      PaperProps={{
        sx: {
          maxHeight: 500, // 최대 높이 설정
          width: '400px',
          margin: 'auto', // 중앙 정렬
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        기업 검색
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            placeholder="기업명"
            id="standard-basic"
            variant="standard"
            size="normal"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // 입력 값 업데이트
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSearch(); // 엔터키 입력 시 handleSearch 호출
              }
            }}
            fullWidth
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* 검색 상태 표시 */}
        {loading && <CircularProgress />}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* 검색 결과 또는 결과 없음 표시 */}
        {!loading && !error && (
          <>
            {stocks.length === 0 ? (
              <Typography align="center" sx={{ mt: 2 }}>
                검색 결과가 없습니다.
              </Typography>
            ) : (
              <List>
                {stocks.map((stock) => (
                  <ListItem
                    key={stock.stockCode} // 고유한 ID 사용
                    button="true"
                    onClick={() => handleStockClick(stock)} // 항목 클릭 처리
                  >
                    <ListItemText
                      primary={stock.stockName} // 주식 이름
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default StockSearchDialog;
