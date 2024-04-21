import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import PopUp from '../orders/popUp';

export default function DetailsTray() {
    const idClient = useSelector(state => state.clients.id);
    const location=useLocation();
    const [tray,setTray]=useState();

    useEffect(() => {
        const {tray}=location.state;
           setTray(tray)
    }
    
  )
  return (
    <div style={{display: "flex",flexDirection:"row",justifyContent:"center"}}>
      
        <div   style={{ padding: "100px" }}>
        <Typography gutterBottom variant="h5" component="div" >
        {tray?.name}        </Typography>
        <Typography variant="body2" color="text.secondary">
              <h3>{tray?.description}</h3>
              <div>גודל: {tray?.size} ס"מ  </div>
              <div> מחיר: {tray?.price} ש"ח </div>
              <span  style={{ fontWeight: 'bold'}}>   רשימת פירות:</span>
              {tray?.fruits?.map(fruit => <div><Typography fontSize={15} >{fruit?.name} {fruit?.color}</Typography><img style={{width:'30px'}} src={fruit?.image}></img></div>)}
        </Typography>
        </div>
        <img src={tray?.image} style={{width:"400px",objectFit:"contain"}}></img>
        <PopUp />
    </div>
  )
}
