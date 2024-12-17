import { Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Keyword = () => {
  const { keyword_id } = useParams();
  console.log('URL 파라미터 keyword_id:', keyword_id);
  const [keyword, setKeyword] = useState({});

  // 이쪽은 키워드 링크 거는 쪽에서 오전6시 전이면 전날의 데이터를 가져오게 설정해야 할듯

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
        {/* {키워드} */}
        <Typography variant="h2" component="div">
          {keyword.name}
        </Typography>
        {/* 관심도 + {랭킹} + 위( + {interest} + ) */}
        <Typography variant="h4" component="div">
          {'관심도 ' + keyword.ranking + '위(' + keyword.interest + ')'}
        </Typography>
        {/* 0이면 긍정(파랑), 1이면 부정(빨강)  */}
        <Typography
          variant="h4"
          component="div"
          sx={{ color: keyword.emotion === 0 ? 'blue' : 'red' }}
        >
          {keyword.emotion === 0 ? '긍정' : '부정'}
        </Typography>

        {/* 카드 안에, 뉴스랑 같은 사이즈 */}
        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5">키워드 분석</Typography>
            {/* {reason} 약간회색 */}
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              {keyword.reason}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {/* <hr style={{ color: 'text.secondary', paddingX: '150px' }} /> */}
    </div>
  );
};

export default Keyword;
