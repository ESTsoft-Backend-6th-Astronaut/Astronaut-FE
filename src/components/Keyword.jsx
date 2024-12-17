import { Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Keyword = () => {
  const { keyword_id } = useParams();
  console.log('URL 파라미터 keyword_id:', keyword_id);
  const [keyword, setKeyword] = useState({});

  // 오늘의 키워드 가져오기
  const fetchData = async () => {
    try {
      console.log('API 호출 URL: ', `/api/keywords/popular/react`);
      const response = await axios.get(`/api/keywords/popular/react`);
      console.log(
        'API 응답 데이터 : ' + JSON.stringify(response.data, null, 2),
      );
      const keywordList = response.data;

      // keyword_id와 일치하는 객체 필터링
      const filteredKeyword = keywordList.find(
        (item) => String(item.keywordId) === String(keyword_id),
      );

      if (filteredKeyword) {
        setKeyword({
          id: filteredKeyword.keywordId,
          name: filteredKeyword.keywordName,
          interest: filteredKeyword.interest,
          emotion: filteredKeyword.emotion,
          reason: filteredKeyword.reason,
          ranking: filteredKeyword.ranking,
        });
      } else {
        console.error(
          '해당 키워드가 존재하지 않습니다. keywordID : ' + keyword_id,
        );
      }
    } catch (error) {
      console.error('키워드를 불러오는 중 오류가 발생했습니다.');
      console.error('키워드 조회 오류: ', error);
    }
  };

  useEffect(() => {
    console.log('keyword의 fetchData 함수 실행!');
    fetchData();
  }, [keyword_id]);

  return (
    <div>
      <Box sx={{ mb: 3, p: 2, border: 'none', textAlign: 'center' }}>
        <Typography variant="h2" component="div" fontWeight="600">
          {'❝ ' + keyword.name + ' ❞'}
        </Typography>
        <Typography variant="h4" component="div" fontWeight="600">
          {'관심도 ' + keyword.ranking + '위(' + keyword.interest + ')'}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          fontWeight="600"
          sx={{ color: keyword.emotion === 0 ? 'blue' : 'red' }}
        >
          {keyword.emotion === 0 ? '긍정적' : '부정적'}
        </Typography>

        <Card variant="outlined" sx={{ mt: 2, marginTop: '30px' }}>
          <CardContent>
            <Typography variant="h5">키워드 분석</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              {keyword.reason}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Keyword;
