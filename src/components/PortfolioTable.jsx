import React, { useState, useEffect } from 'react';
import StockSearchDialog from './StockSearchDialog';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const EditableCell = ({
  value,
  isEditable,
  onChange,
  formatValue,
  onSearch,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 'auto' }}>
      {isEditable ? (
        <TextField
          variant="standard"
          size="small"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{ flexGrow: 1, fontSize: '0.875rem' }}
        />
      ) : (
        <Typography sx={{ flexGrow: 1, fontSize: '0.875rem' }}>
          {formatValue ? formatValue(value) : value}
        </Typography>
      )}
      {onSearch && (
        <IconButton size="small" onClick={onSearch} sx={{ ml: 1 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

function PortfolioTable() {
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [error, setError] = useState(null); // API 호출 실패 시 에러 메시지 저장
  const [searchDialogOpen, setSearchDialogOpen] = useState(false); // 검색 다이얼로그의 열림 상태 관리
  const [selectedRowId, setSelectedRowId] = useState(null); // 검색으로 선택된 행의 ID 저장

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/portfolios');
      const fetchedData = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setData(fetchedData);
      setIsDataLoaded(true);
      setIsEditMode(fetchedData.length <= 0);
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRow = () => {
    const newRow = {
      portfolioId: Date.now(),
      stockCode: '',
      stockName: '',
      averagePrice: '',
      stockCount: '',
      totalPrice: '',
      isNewRow: true,
    };
    setData((prev) => [...prev, newRow]);
  };

  const handleDeleteRow = async (id) => {
    // 삭제 확인
    const confirmation = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmation) return; // 사용자가 취소를 누르면 함수 종료

    const rowToDelete = data.find((row) => row.portfolioId === id);

    if (rowToDelete?.isNewRow) {
      // 새로 추가된 행은 즉시 삭제
      setData((prev) => prev.filter((row) => row.portfolioId !== id));
    } else {
      // 기존 데이터는 서버 요청 후 삭제
      try {
        await axios.delete(`/api/portfolios/${id}`);
        setData((prev) => prev.filter((row) => row.portfolioId !== id));
        alert('포트폴리오 삭제에 성공했습니다.');
      } catch (error) {
        console.error('포트폴리오 삭제 실패:', error);
        alert('포트폴리오 삭제에 실패했습니다.');
      }
    }
  };

  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.portfolioId === id) {
          const updatedRow = { ...row, [field]: value };

          if (field === 'averagePrice' || field === 'stockCount') {
            const averagePrice = parseFloat(updatedRow.averagePrice || 0);
            const stockCount = parseFloat(updatedRow.stockCount || 0);
            updatedRow.totalPrice = isNaN(averagePrice * stockCount)
              ? ''
              : (averagePrice * stockCount).toFixed(2);
          }

          return updatedRow;
        }
        return row;
      }),
    );
  };

  // 검색 다이얼로그 열기
  const handleSearchClick = (rowId) => {
    setSelectedRowId(rowId);
    setSearchDialogOpen(true);
  };

  // 검색 다이얼로그 닫기
  const handleCloseSearchDialog = () => {
    setSearchDialogOpen(false);
    setSelectedRowId(null);
  };

  // 검색된 주식 선택
  const handleStockSelection = (selectedStock) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.portfolioId === selectedRowId
          ? {
              ...row,
              stockName: selectedStock.stockName,
              stockCode: selectedStock.stockCode,
              isNewRow: true,
            }
          : row,
      ),
    );
    handleCloseSearchDialog();
  };

  const handleSave = async () => {
    // 새로 추가된 행
    const newRows = data.filter((row) => row.isNewRow);

    // 기존에 있던 행(수정된 데이터)
    const existingRows = data.filter((row) => !row.isNewRow);

    // 입력 검증
    const invalidRows = newRows.filter(
      (row) =>
        !row.stockCode || // 주식 종목 코드가 비었는지 확인
        !row.stockName || // 주식 이름이 비었는지 확인
        !row.averagePrice || // 평단가가 비었는지 확인
        !row.stockCount, // 개수가 비었는지 확인
    );

    if (invalidRows.length > 0) {
      alert('기업명/평단가/개수는 필수 입력 항목입니다.');
      return;
    }

    try {
      // POST 요청 (새로운 행 저장)
      if (newRows.length > 0) {
        const newPayload = newRows.map((row) => ({
          stockCode: row.stockCode,
          averagePrice: row.averagePrice,
          stockCount: row.stockCount,
        }));
        await axios.post('/api/portfolios', newPayload);
      }

      // PATCH 요청 (기존 행 수정)
      if (existingRows.length > 0) {
        const updatePromises = existingRows.map((row) => {
          const updatedPayload = {
            stockCode: row.stockCode,
            averagePrice: row.averagePrice,
            stockCount: row.stockCount,
          };
          return axios.patch(
            `/api/portfolios/${row.portfolioId}`,
            updatedPayload,
          );
        });
        await Promise.all(updatePromises);
      }

      // 데이터 다시 로드 및 상태 초기화
      fetchData();
      setIsEditMode(false);
      alert('포트폴리오 저장에 성공했습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('포트폴리오 저장에 실패했습니다.');
    }
  };

  const handleCancelEdit = () => {
    fetchData(); // 취소 시 원래 데이터로 되돌리기
  };

  // 렌더링 로직은 기존과 유사하게 유지
  if (!isDataLoaded) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const formatNumber = (value) => new Intl.NumberFormat('ko-KR').format(value);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          marginTop: '80px',
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1000,
            border: 'none',
            boxShadow: 'none',
            marginBottom: '100px',
          }}
        >
          <Table
            sx={{ minWidth: 275, border: 'none' }}
            aria-label="portfolio table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">기업명</TableCell>
                <TableCell align="left">평단가</TableCell>
                <TableCell align="left">개수</TableCell>
                <TableCell align="left">총 가격</TableCell>
                {isEditMode && <TableCell align="center">삭제</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((stock, index) => (
                  <TableRow key={stock.portfolioId || index}>
                    <TableCell align="left">
                      <EditableCell
                        value={stock.stockName}
                        isEditable={isEditMode || stock.isNewRow}
                        isNewRow={stock.isNewRow}
                        onChange={(value) =>
                          handleInputChange(
                            stock.portfolioId,
                            'stockName',
                            value,
                          )
                        }
                        onSearch={
                          stock.isNewRow
                            ? () => handleSearchClick(stock.portfolioId)
                            : null
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <EditableCell
                        value={stock.averagePrice}
                        isEditable={isEditMode || stock.isNewRow}
                        onChange={(value) =>
                          handleInputChange(
                            stock.portfolioId,
                            'averagePrice',
                            value,
                          )
                        }
                        formatValue={(value) =>
                          value ? `${formatNumber(value)}원` : ''
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <EditableCell
                        value={stock.stockCount}
                        isEditable={isEditMode || stock.isNewRow}
                        onChange={(value) =>
                          handleInputChange(
                            stock.portfolioId,
                            'stockCount',
                            value,
                          )
                        }
                        formatValue={(value) =>
                          value ? `${formatNumber(value)}주` : ''
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <EditableCell
                        value={stock.totalPrice}
                        isEditable={false}
                        formatValue={(value) =>
                          value ? `${formatNumber(value)}원` : ''
                        }
                      />
                    </TableCell>
                    {isEditMode && (
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleDeleteRow(stock.portfolioId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isEditMode ? 5 : 4} align="center">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={2} textAlign="center">
        {!isDataLoaded ? (
          // 로딩 중 상태
          <div>로딩 중...</div>
        ) : data.length === 0 ? (
          // 데이터가 없을 때
          <>
            <IconButton size="small" onClick={handleAddRow}>
              <AddCircleOutlineIcon color="primary" />
            </IconButton>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ ml: 1, width: '165px', borderRadius: '10px' }}
            >
              저장
            </Button>
          </>
        ) : !isEditMode ? (
          // 데이터가 있고 편집 모드가 아닐 때
          <Button
            variant="contained"
            sx={{ width: '165px', borderRadius: '10px' }}
            onClick={() => setIsEditMode(true)}
          >
            수정하기
          </Button>
        ) : (
          // 편집 모드일 때
          <>
            <IconButton size="small" onClick={handleAddRow}>
              <AddCircleOutlineIcon color="primary" />
            </IconButton>
            <Button
              variant="outlined"
              onClick={() => {
                setIsEditMode(false);
                handleCancelEdit();
              }}
              sx={{ ml: 1, width: '165px', borderRadius: '10px' }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ ml: 1, width: '165px', borderRadius: '10px' }}
            >
              저장
            </Button>
          </>
        )}
      </Box>

      <StockSearchDialog
        open={searchDialogOpen}
        onClose={handleCloseSearchDialog}
        onStockSelect={(selectedStock) => {
          handleStockSelection(selectedStock);
        }}
      />
    </div>
  );
}

export default PortfolioTable;
