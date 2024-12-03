import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 환경 변수 API URL
const API_URL = process.env.REACT_APP_API_URL;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// 토큰 재발급 함수
const reIssuedToken = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token'); // refresh_token 가져오기

    if (!refresh_token) {
      // refresh_token이 없을 경우 처리
      const navigate = useNavigate();
      navigate('/login-error');
      return null;
    }

    const response = await axiosInstance.post('/members/reissue', {
      refresh_token, // refresh_token을 요청의 본문에 추가
    });
    console.log(response);
    localStorage.setItem('access_token', response.data.data.access_token);
    return localStorage.getItem('access_token'); // 재발급받은 access_token 반환
  } catch (error) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    const navigate = useNavigate();
    navigate('/login-error');
    return null;
  }
};

// Axios 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답 처리
  async (error) => {
    const { config, response } = error;

    console.log('에러발생 ============================');
    console.log(error);

    if (
      config.url !== '/members/reissue' &&
      response &&
      response.status === 401
    ) {
      console.log('재발급요청하기 ============================');
      const access_token = await reIssuedToken();

      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`; // 헤더에 토큰 추가
        return axiosInstance(config); // 재요청
      }
    } else {
      const navigate = useNavigate();
      navigate('/login-error');
    }
    return Promise.reject(error);
  },
);

// Axios 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
