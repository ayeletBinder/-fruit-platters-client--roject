import {  WidthFull } from '@mui/icons-material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router';
import Allclients from '../clients/Allclients';
import AddComment from '../comments/AddComment';
import { Avatar, Button, Rating } from '@mui/material';
export default function SpecificComment() {
    const comments = useSelector(state => state.comments.comments);
    const orders = useSelector(state => state.orders.orders);
    const trays = useSelector(state => state.trays.trays);
    const clients = useSelector(state => state.clients.clients);
    const [filterComment,setFilterComment]=useState([]);
    const location=useLocation();
    const {trayId}=location.state;
    let thisComments=comments.filter(f=>f.trayId==trayId)
    const tray=trays.find(t=>t.idTray==trayId);
    const srcTray=tray.image;
    console.log(thisComments);
    const navigate=useNavigate();
    return(<>
    <div style={{textAlign:"center",width:'70%' ,marginTop:'0px',
            width:'99%'}}>
        <img style={{textAlign:"center",width:'70%' ,marginTop:'0px',height:'250px', objectFit:"contain"}} src={srcTray}></img>
        <h2>{tray.name}</h2>
       <Button onClick={()=>{  navigate('/AddComment', { state: {id: tray.idTray} })}}  style={{color:'#ff9800', textDecoration: 'none'}}>להוספת תגובה:</Button>
 

        <p>תגובות על המגש:</p> 
        {thisComments&&thisComments?.map((comment, index) => (
        <div key={comment.id} style={{border: "1px solid #ccc",borderRadius: "10px",boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",margin:'2px',padding:'2px',width:'70%',marginLeft:'15%'}}>
        {comment.response}
        <br/>
        <Rating disabled defaultValue={comment.rating} size="small" />
        {comment.image &&<Avatar variant="rounded" sx={{marginLeft:'45%',width:100,height:100}} src={comment.image}/>}

        </div>
        ))}
    </div>
    </>
    )
}
