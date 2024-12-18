import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function StockDetailTable({ stockId, dataType }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stockId) return; // recommendStockId가 없으면 요청하지 않음

    const params = {
      dataType: dataType,
      stockId: stockId, // 동적으로 파라미터 값 설정
    };

    axios
      .get('/api/stock/stock_detail', { params })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [dataType, stockId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const formatNumber = (number) => {
    return Number(number).toLocaleString();
  };

  return (
    <div>
      {data ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: 705, minWidth: 275 }}
            aria-label="stock details table"
          >
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  시장구분
                </TableCell>
                <TableCell align="left">{data.data.marketName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  종가
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.stockPrice)} 원
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  대비(등락률)
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.contrast)} (
                  {data.data.fluctuationRate}%)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  시가
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.marketPrice)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  고가
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.highPrice)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  저가
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.lowPrice)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  거래량
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.volume)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  거래대금
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.dollarVolume)} 원
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  시가총액
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.marketCapitalization)} 원
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  상장주식수
                </TableCell>
                <TableCell align="left">
                  {formatNumber(data.data.totalSharesOutstanding)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StockDetailTable;
