import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const KeywordRanking = () => {
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/keywords/ranking')
      .then((response) => {
        setKeywords(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  // interest의 최대값을 찾기
  const maxInterest = Math.max(...keywords.map(keyword => keyword.interest));

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 5 }}>
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
                <TableRow key={index}>
                  <TableCell>{keyword.ranking}</TableCell>
                  <TableCell>{keyword.keywordName}</TableCell>
                  <TableCell>{Math.round((keyword.interest / maxInterest) * 100)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default KeywordRanking;