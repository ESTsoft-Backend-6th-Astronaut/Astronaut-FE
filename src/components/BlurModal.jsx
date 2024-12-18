import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './BlurModal.css';
import { Button } from '@mui/material';

const BlurModal = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="blur-modal-container">
      <div className="blur-modal-content">
        {/* 블러 처리될 하위 컨텐츠 */}
        <div className={`blur-modal-children ${!isLoggedIn ? 'blurred' : ''}`}>
          {children}
        </div>

        {/* 로그인 모달 */}
        {!isLoggedIn && (
          <div className="login-overlay">
            <div className="login-modal">
              <Lock size={48} color="#6b7280" />
              <h2 className="text-xl font-bold mb-4">로그인이 필요합니다</h2>
              <p className="text-gray-600 mb-6">
                로그인하고 포트폴리오에 최적화된 주식 종목 추천을 받아보세요!
              </p>
              <Button
                variant="contained"
                sx={{ mt: 2, width: '235px' }}
                onClick={() => {
                  navigate('/login');
                  handleLoginClick();
                }}
              >
                로그인
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlurModal;
