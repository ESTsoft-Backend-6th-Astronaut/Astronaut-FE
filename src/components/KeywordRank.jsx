import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Router로 페이지 이동
import './KeywordRank.css';

const KeywordRank = () => {
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router로 페이지 이동
  const [hoveringRow, setHoveringRow] = useState(null);

  useEffect(() => {
    axios
      .get('/api/keywords/get_today')
      .then((response) => {
        setKeywords(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // 클릭 이벤트 핸들러: keywordId를 경로로 사용하여 페이지 이동
  const handleRowClick = (keywordId) => {
    if (keywordId) {
      navigate(`/keyword/${keywordId}`); // 이동할 경로
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  // interest의 최대값을 찾기
  const maxInterest = Math.max(...keywords.map((keyword) => keyword.interest));

  // 마우스 호버링시 이벤트(색이 어두워짐)
  const handleMouseOver = (index) => {
    setHoveringRow(index);
  };

  const handleMouseOut = () => {
    setHoveringRow(null);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        mt: 5,
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          인기 키워드 랭킹
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>순위</TableCell>
                <TableCell>키워드</TableCell>
                <TableCell>비율</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {keywords.map((keyword, index) => (
                <TableRow
                  key={index}
                  className={hoveringRow === index ? 'bg-color' : ''}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={handleMouseOut}
                >
                  <TableCell>{keyword.ranking}</TableCell>
                  <TableCell
                    onClick={() => handleRowClick(keyword.keywordId)}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {keyword.keywordName}
                  </TableCell>
                  <TableCell>
                    {Math.round((keyword.interest / maxInterest) * 100)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default KeywordRank;
