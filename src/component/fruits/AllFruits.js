import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PhonelinkLockOutlined, RoomServiceOutlined } from "@mui/icons-material";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SellIcon from '@mui/icons-material/Sell';import RoomIcon from '@mui/icons-material/Room';
import ColorLensIcon from '@mui/icons-material/ColorLens';import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Avatar, Box, Checkbox, LinearProgress } from "@mui/material";
import { fetchfruits } from "./fruitSlice1.js";
import AddFruit from "./AddFruit.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import Edit from "./Edit.js";

export default function Allfruits() {
  const nav=useNavigate();
    const [withAdd,setWithAdd]=useState(false);
    const fruits = useSelector(state => state.fruits.fruits)
    console.log(fruits);
    const status = useSelector(state => state.fruits.status)
    const dispatch = useDispatch();
    useEffect(() => {
      console.log('in useeffect');
      if (fruits.length === 0) {
        if (status !== 'fulfilled')
          dispatch(fetchfruits())
      }
  
    }, [])

    function setFruit(fruit){
      nav('/Edit', {state: {fruitId: fruit?.id,fruitName: fruit?.name,fruitColor: fruit?.color,fruitSomeAdditional: fruit?.someAdditional,fruitIsExists:fruit?.isExists,fruitImage:fruit?.image}})
    }

    return (<>   
          {status === 'idle' && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary"/>
        </Box>
      )}
      {status === 'pending' && <p>המחיקה מתבצעת</p>}
        
      {!withAdd&&<Button sx={{marginTop:2}} variant="outlined" onClick={()=>setWithAdd(true)} >
        להוספת פרי חדש
      </Button>}
      {withAdd&&<AddFruit withAdd="SetwithAdd"/>}

      <div style={{display:'flex',flexWrap: 'wrap',margin:'2px',padding:'3px'}}>
        {fruits[0] && fruits?.map((fruit, index) => {
          return (
            <div  key={fruit?.id}>
              <Card sx={{ maxWidth: 345 ,objectFit: 'cover',  margin: '6%'}}>
              <Button onClick={()=>{setFruit(fruit)}}> עריכה<EditIcon/></Button>

                <CardMedia
                  title="speaker"
                />
                <CardContent>
                  {":שם"}<Typography gutterBottom variant="h5" component="div">
                       {fruit?.name }{" "}
                  </Typography>
                  {fruit?.image &&<Avatar variant="rounded" sx={{width:200,height:200}} src={fruit?.image}/>}
                  <Typography variant="body2" color="text.secondary">
                  {fruit?.color && <> צבע: {fruit?.color} <ColorLensIcon/></>}
                       <br/>
                      {fruit?.someAdditional}  :מחיר<SellIcon/>
                       <br/>
                        קיים במלאי <Checkbox  checked={fruit?.isExists} />
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </div>
          )
        })}
      </div>
      </> 
    )
  }
  
  





