import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';

const KeywordNews = ({ keywordId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/keywords/${keywordId}/news`)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [keywordId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>키워드 관련 뉴스</h1>
      {data ? (
        data.data.map((news) => (
          <Box
            key={news.newsId}
            sx={{
              // maxWidth: 1030,
              minWidth: 275,
              mb: 2,
              alignContent: 'center',
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                  {news.emotion}
                </Typography>
                <Typography variant="h5" component="div">
                  {news.title}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}
                >
                  {news.newspaper} | {news.timeAgo}
                </Typography>
                <Typography variant="body2">{news.summary}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={news.originalLink}
                  target="_blank"
                >
                  기사 전문 보기
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default KeywordNews;
