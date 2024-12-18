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

const pages = [
  { name: '포트폴리오', path: '/portfolio' },
  { name: '키워드', path: '/keyword' },
];
const NavBar = memo(function NavBar() {
  const [username, setUsername] = React.useState('');

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  React.useEffect(() => {
    const username = localStorage.getItem('username');
    setUsername(username);
    console.log(username);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleResetStorage = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
  };

  return (
    // 아우터 스페이스 컬러
    <AppBar
      position="static"
      sx={{ backgroundColor: '#2D383A', marginBottom: '50px' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logoImage}
            alt="Logo"
            style={{
              height: 50,
              display: 'flex',
              mr: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          />
          <Box
            component="button" // HTML button으로 설정
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            onClick={() => navigate('/')}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              우리는 주식인
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {username ? (
              <>
                <Tooltip title="Move to Login">
                  <Button
                    variant="contained"
                    onClick={handleResetStorage}
                    sx={{ gap: 2, textTransform: 'none' }}
                    color="inherit"
                  >
                    <Avatar sx={{ width: 36, height: 36 }}>
                      {username.charAt(0)}
                    </Avatar>
                    <Typography style={{ color: 'black' }}>
                      {username}
                    </Typography>
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Move to Login">
                  <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{
                      gap: 2,
                      textTransform: 'none',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                    color="dark"
                  >
                    <Avatar sx={{ width: 36, height: 36 }}>
                      <PersonOutlineIcon />
                    </Avatar>
                    <Typography style={{ color: 'white' }}> 게스트</Typography>
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
export default NavBar;
