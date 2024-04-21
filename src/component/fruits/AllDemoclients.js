import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchclients } from "./clientSlice.js";
import '../style.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Margin, Padding, PhonelinkLockOutlined, RoomServiceOutlined } from "@mui/icons-material";


import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export default function Allclients() {
    const clients = useSelector(state => state.clients.clients)
    console.log(clients);
    const status = useSelector(state => state.clients.status)
    const dispatch = useDispatch();
    useEffect(() => {
      console.log('in useeffect');
      if (clients.length === 0) {
        if (status !== 'fulfilled')
          dispatch(fetchclients())
      }
  
    }, [])
    return (
      <div className='mainDiv fruits' >
        {clients && clients.map((client, index) => {
          return (
            <div className='divClient' key={client.id} >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  title="speaker"
                />
                <CardContent>
                  {":שם"}<Typography gutterBottom variant="h5" component="div">
                       {client.firstName }{" "}
                      {client.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {client.phone} <LocalPhoneIcon/>
                       <br/>
                       {client.email} <EmailIcon/>
                       <br/>
                         {client.address} <RoomIcon/>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">לכל ההזמנות של {client.firstName}  </Button>                <FormatListBulletedIcon/>

                </CardActions>
              </Card>
            </div>
          )
        })}
      </div>
    )
  }
  
  





