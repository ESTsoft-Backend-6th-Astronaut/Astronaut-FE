import React from 'react';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import { ReactComponent as IconKakaoLogin } from '../assets/rescureImg/KakaoLogin.svg';

function Login() {
  const kakaoID = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const APP_URI = process.env.REACT_APP_API_URL;
  console.log(kakaoID);

  const kakaoSuccessHandler = (data) => {
    const requestData = {
      id_token: data.response.id_token,
      oauth_provider: 'KAKAO',
    };
    console.log(requestData);
    axios
      .post(`${APP_URI}/members/oauth`, requestData)
      .then((response) => {
        const { access_token, refresh_token } = response.data.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
      })
      .catch((error) => {
        console.error('로그인 또는 회원가입에 실패했습니다.', error);
      });
  };

  const kakaoFailHandler = (err) => {
    alert('카카오 로그인 실패');
  };

  return (
    <KakaoLogin
      token={kakaoID || ''}
      onSuccess={kakaoSuccessHandler}
      onFail={kakaoFailHandler}
      render={(props) => (
        <div className="flex justify-center cursor-pointer">
          <IconKakaoLogin onClick={props.onClick} />
        </div>
      )}
    />
  );
}

export default Login;
