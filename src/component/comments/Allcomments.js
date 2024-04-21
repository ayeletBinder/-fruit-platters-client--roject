import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcomments } from "./commentSlice.js";
import '../style.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Rating } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";
import { fetchtrays } from "../trays/traySlice.js";
import UndoIcon from '@mui/icons-material/Undo';

const Allcomments = () => {
  const [filterComment,setFilterComment]=useState([])
  const navigate = useNavigate();
  const comments = useSelector(state => state.comments.comments);
  const orders = useSelector(state => state.orders.orders);
  const trays = useSelector(state => state.trays.trays);
  const clients = useSelector(state => state.clients.clients);
   const status = useSelector(state => state.comments.status);
  const dispatch = useDispatch();
  const admin = useSelector(state => state.clients.admin);
const [all,setAll]=useState(false)
const location = useLocation();

  useEffect(() => {
    const idC = location.state?.idClient;
    if(idC){
      setFilterComment([...comments.filter(c => c.clientId == idC)]);
      
    }
    else{
    setFilterComment([...comments])
  }
    console.log(filterComment.length,"filterComment.length");
    console.log(comments.length,"comments.length");
  }, []);
  const locationState = useLocation().state;
  const y = locationState ? locationState.id : null;
  return (<>
    {all && <Button sx={{marginTop:2}} variant="outlined" onClick={()=>{navigate(-1) ; setAll(false)}}  startIcon={<UndoIcon/>}>לכל התגובות</Button>}

    <div className='mainDiv'>

      {status === 'idle' && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary"/>
        </Box>
      )}
      {status === 'pending' && <p>המחיקה מתבצעת</p>}
      
      {filterComment&& filterComment.length > 0 && filterComment.map((comment) => {
          return (
            <div className='divClient' key={comment.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: '0vh', width: '19vw', objectFit: 'cover' , justifyContent:"center"}}
                />
               {comment.image &&        <CardMedia
        sx={{ height: 200 ,objectFit:'cover'}}
        image={comment.image}
        title="green iguana"
      />}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {comment.response}<br/>
                    <Rating defaultValue={comment.rating} size="small"/><br/>
                    {admin && <Typography fontSize={15}> {comment.clientId} קוד לקוח:</Typography>}
                    <Typography fontSize={15}> {clients.find(x => x.id === comment.clientId)?.firstName} {clients.find(x => x.id === comment.clientId)?.lastName}  שם לקוח:</Typography>
                    :פירות
                    {trays.find(x => x.idTray === comment.trayId)?.fruits.map(fruit => <Typography fontSize={15}>{fruit.name} {fruit.color}</Typography>)}
                    <Typography fontSize={15}> {trays.find(x => x.idTray === comment.trayId)?.price}  :מחיר</Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary"></Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => navigate('/AddComment', { state: {id: comment.trayId} })} size="small">לתגובה נוספת</Button>
                </CardActions>
              </Card>
            </div>
          );

      
          return (
            <div className='divClient' key={comment.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: '0vh', width: '19vw', objectFit: 'cover' , justifyContent:"center"}}
                />
                      {comment.image &&<Avatar variant="rounded" sx={{width:200,height:200}} src={comment.filelImage}/>}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {comment.response}<br/>
                    <Rating defaultValue={comment.rating} size="small" sx={{color:'#ba68c8'}} /><br/>
                    {admin && <Typography fontSize={15}> {comment.clientId} קוד לקוח:</Typography>}
                    <Typography fontSize={15}> {clients.find(x => x.id === comment.clientId).firstName} {clients.find(x => x.id === comment.clientId).lastName}  שם לקוח:</Typography>
                    :פירות
                    {trays.find(x => x.idTray === comment.trayId).fruits.map(fruit => <Typography fontSize={15}>{fruit.name} {fruit.color}</Typography>)}
                    <Typography fontSize={15}> {trays.find(x => x.idTray === comment.trayId).price}  :מחיר</Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary"></Typography>
                </CardContent>
                <CardActions>
                <Button onClick={() =>{ navigate('/comments', { state: {id:comment.trayId} }); setAll(true)}} size="small">לכל ההתגובות למגש זה</Button>
                  <Button onClick={() => navigate('/AddComment', { state: {id: comment.trayId} })} size="small">לתגובה נוספת</Button>
                </CardActions>
              </Card>
            </div>
          );
      }

      )}
    </div>
    </>
  );
};

export default Allcomments;