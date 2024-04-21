import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchtrays, removetray } from "./traySlice.js";
import { Box, Button, Card, CardActions, CardContent, CardMedia, LinearProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';
import { useOrder } from '../orders/orderSlice.js'
import { Padding } from "@mui/icons-material";

const Alltrays = () => {
    let trays = useSelector(state => state.trays.trays);
    const status = useSelector(state => state.trays.status);
    const idClient = useSelector(state => state.clients.id);
    const dispatch = useDispatch();
    const navigate=useNavigate();
  

    function commentFun(tray){
      navigate('/SpecificComment',{state:{trayId:tray}})
    }
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [trayName, setTrayName] = useState();
    const filteredProducts = trays.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice 
    );
    trays=[...filteredProducts]


  
    return (<>
                {status === 'idle' &&   <Box sx={{ width: '100%' }}>
            <LinearProgress color="secondary"/><p> לא נשלפו עדיין מגשים</p>
          </Box>}
            {status === 'pending' && <p>המחיקה מתבצעת</p>}
            <div style={{ margin:'22px'}}>
            <Box>

      <TextField
        label="מחיר מינימלי"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <span> _ </span>
      <TextField
        label="מחיר מקסימלי"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
          </Box>


    </div>
        <ul style={{Padding:'9px',margin:'5px',display:'flex',flexWrap:"wrap"}}>            

            {trays && trays.map((tray, index) => {
                return (<>
           <Card key={tray.idTray} sx={{ boxShadow: '5px 10px 5px rgba(0, 0, 0, 0.3)',width:300, height: '65vh' ,margin:'15px',objectFit:'cover'}}>
      <CardMedia
        sx={{ height: 200 ,objectFit:'cover'}}
        image={tray.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {tray.name}        </Typography>
        <Typography variant="body2" color="text.secondary">
              <h3>{tray.description}</h3>
              <div>{tray.size} גודל</div>
              <div>{tray.price} מחיר </div>
             </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={()=>commentFun(tray.idTray)}>לתגובות</Button>
      <Button size="small" 
      onClick={()=>navigate('/DetailsTray',{state:{tray:tray}})}
      >לפירוט</Button>
      </CardActions>
    </Card>
                </>)
            })}
        </ul >
        </>
    )
}

export default Alltrays