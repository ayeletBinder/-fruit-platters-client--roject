import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import SignIn from './clients/signIn.js';
import clients from './clients/Allclients.js'
import trays from './trays/Alltrays.js'
import comments from './comments/Allcomments.js'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateClientFullName } from './clients/clientSlice.js';
import  AddComment  from './comments/AddComment.js';
import BasicList from '../personal_area.js';
import { useState } from 'react';
const pages = ['comments','Alltrays','BasicList'];
const namePages = [ 'תגובות','כל המגשים','איזור אישי'];
const pagesAdmin = ['Allfruits','clients','trays'];
const namePagesAdmin = ['פירות', 'כל הלקוחות','הוספת מגש'];

const settings = []
function ResponsiveAppBar() {
  const srcImage="./pictures/לוגו מנגו.png"
    const fullName =useSelector(state => state.clients.fullName);
    const idClient = useSelector(state => state.clients.id);

    const admin =useSelector(state => state.clients.admin);
    const navigate= useNavigate();

    let x=fullName.slice(0,1).toUpperCase() ;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 const dispatch=useDispatch();
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


  };
  
  return (
    <>
    <AppBar position="static"            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}>
      <Container maxWidth="xl" spacing={2} >
        <Toolbar disableGutters>
          <img src={srcImage} onClick={() => navigate('/')} style={{ height: "4vh"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a" 
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                {pages.map((page,index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to={`/${page}`}>{namePages[index]}</Link></Typography>
                </MenuItem>
              ))}

            {pagesAdmin.map((page,index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                 {admin &&   <Typography textAlign="center"><Link to={`/${page}`}>{namePagesAdmin[index]}</Link></Typography>}
                </MenuItem>
              ))}


            </Menu>
          </Box>
        
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page,index) => (
            <Link to={`/${page}`}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block',color:'#ff9800' }}
              >
              {namePages[index]}
              </Button>
              </Link>   
              ))}
             {pagesAdmin.map((page,index) => (
            <Link to={`/${page}`}>
              {admin && <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block',color:'#ff9800' }}
              >
              {namePagesAdmin[index]}
              </Button>}
              </Link>  
             ))}
             
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={x} src='{}' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <Typography sx={{color:'#ba68c8'}} textAlign="center">{fullName}</Typography>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" ><Link to={`/${setting}`}>{setting}</Link></Typography>
                </MenuItem>
              ))}Logout
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
          </>

  );
}
export default ResponsiveAppBar;
