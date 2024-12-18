import React, { memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import logoImage from '../assets/rocketicon.gif';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function NavBar() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false); // 스피너 상태
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  React.useEffect(() => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (username && email) {
      setUser({ username, email });
    }
  }, []);

  const handleResetStorage = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      location.href = '/';
    }, 1000);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#2D383A', marginBottom: '50px' }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src={logoImage}
              alt="Logo"
              sx={{ width: 64, height: 64, marginRight: 2, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              우리는 주식인
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 6 }}>
              <Typography
                component={Link}
                to="/portfolio"
                sx={{
                  textDecoration: 'none',
                  color: '#ccc',
                  marginRight: 3,
                }}
              >
                포트폴리오
              </Typography>
              <Typography
                component={Link}
                to="/keyword"
                sx={{
                  textDecoration: 'none',
                  color: '#ccc',
                  marginRight: 3,
                }}
              >
                키워드
              </Typography>
            </Box>
          </Box>

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              {/* 사용자 정보 표시 (수평) */}
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                {user.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: '0.875rem', color: 'gray', marginRight: 2 }}
              >
                {user.email}
              </Typography>
              {/* 로그아웃 버튼 */}
              <Button
                color="inherit"
                sx={{
                  ml: 'auto',
                  bgcolor: '#444', // 어두운 배경
                  color: '#f3f3f3', // 밝은 텍스트
                  padding: '6px 16px',
                  borderRadius: '20px', // 둥근 버튼 유지
                  fontWeight: 'bold',
                }}
                onClick={handleResetStorage}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              sx={{
                ml: 'auto',
                bgcolor: '#f3f3f3', // 버튼 배경색 (MUI의 기본 색상 사용)
                color: '#444',

                padding: '6px 16px',
                borderRadius: '20px', // 약간 둥근 버튼
                fontWeight: 'bold',
              }}
              onClick={() => navigate('/login')}
            >
              로그인
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)', // 반투명 어두운 배경
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10, // AppBar보다 위에 배치
          }}
        >
          <CircularProgress size={60} sx={{ color: '#fff' }} /> {/* 스피너 */}
        </Box>
      )}
    </>
  );
}
export default NavBar;
