import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoLogin = () => {
  useEffect(() => {
    // Kakao 초기화
    window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log(authObj);
        axios
          .post(`${process.env.REACT_APP_API_URL}/auth/kakao/callback`, {
            accessToken: authObj.access_token,
          })
          .then((response) => {
            console.log('JWT Token:', response.data.token);
            // JWT 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', response.data.token);
          })
          .catch((error) => {
            console.error('Error during Kakao login:', error);
          });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <div>
      <h1>Kakao 소셜 로그인</h1>
      <button onClick={handleLogin}>Kakao 로그인</button>
    </div>
  );
};

export default KakaoLogin;
