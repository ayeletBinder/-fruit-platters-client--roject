import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import ForumIcon from '@mui/icons-material/Forum';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SignIn from './component/clients/signIn';
import Allcomments from './component/comments/Allcomments';
import MyOrderTrue from './component/orders/myOrderTrue';
import Home from './component/home';
import { WidthFull } from '@mui/icons-material';
import { resetState } from './component/clients/clientSlice';
import LogoutIcon from '@mui/icons-material/Logout';

export default function BasicList() {
  const theme = useTheme();
  const [signIn,setSignIn]=useState(false)
  const [comments,setComments]=useState(false)
  const [myOrderTrue,setMyOrderTrue]=useState(false)
  const pages = ['comments','trays','Addorders','Alltrays'];
const namePages = [ 'תגובות','מגשים','הזמנה חדשה','Alltrays'];
const idClient = useSelector(state => state.clients.id);
const nav=useNavigate();
const dispatch=useDispatch();
function setSignInFunction(){
  setSignIn(true);
  setMyOrderTrue(false);
  setComments(false);
}
function setCommentsFonction(){
  setComments(true);
  setSignIn(false);
  setMyOrderTrue(false);
}
function setMyOrderTrueFunction(){
  setMyOrderTrue(true);
  setSignIn(false);
  setComments(false);
}
  return (<div style={{display:'flex'}}>
    <Box sx={{
      textAlign:'center',
      backgroundColor: theme.palette.primary.main, maxWidth: 200 , minHeight: "800px" , color:'#ff9800'}}>
      <nav aria-label="main mailbox folders">
        <List>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color:'#ff9800'}}>
                <LoginIcon />
              </ListItemIcon> 
              <Button onClick={()=>setSignInFunction()}  style={{color:'#ff9800', textDecoration: 'none'}}>הרשמה / התחברות</Button>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color:'#ff9800'}}>
                <LogoutIcon />
              </ListItemIcon> 
              <Button onClick={()=>dispatch(resetState())}  style={{color:'#ff9800', textDecoration: 'none'}}>התנתק</Button>
            </ListItemButton>
          </ListItem>
      <Divider sx={{backgroundColor:'#ff9800'}}/>
       
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ForumIcon sx={{color:'#ff9800'}}/>
              </ListItemIcon>
              <Button onClick={()=>setCommentsFonction()}  style={{color:'#ff9800', textDecoration: 'none'}}>התגובות שלי</Button>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider sx={{backgroundColor:'#ff9800'}}/>
      <nav aria-label="secondary mailbox folders" >
        <p>הזמנות שלי </p>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
            <Button onClick={()=>setMyOrderTrueFunction()}  style={{color:'#ff9800', textDecoration: 'none'}} ><ShoppingCartIcon /> סל קניות              
</Button>
            </ListItemButton>
          </ListItem>
         

        </List>
      </nav>
    </Box>
    {signIn && <SignIn/>}
    {myOrderTrue&&<MyOrderTrue />}
    {comments&&<Allcomments/>}
    {(!signIn )&&(!myOrderTrue )&&(!comments)&&<Home/>}
    </div>
  );
}