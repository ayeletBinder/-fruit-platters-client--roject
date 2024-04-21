import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MySelectComponent from './InputItem';
import { useOrder } from '../orderSlice';

export default function EndOrder({trays}) {
    const [date,setDate]=useState('');
    const [first,setFirst]=useState(true);
    const [street,setStreet]=useState('');
    const [success,setSuccess]=useState(false);


    
        const fullName=useSelector(state => state.clients.fullName);
        const { updateOrder } = useOrder() ;

        function ok(event){
            let order={}
            order.addressToSend=street;
            order.executionDate=date;
            const now = Date.now();
            order.orderDate=new Date(now).toLocaleDateString();
                updateOrder(order)
                .then(() => {
                  setSuccess(true);
                });
        }
        const today = new Date();
    
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        function sendAddressFromfunc(data){
          setStreet(data.description)
        }
    
      return (
        <React.Fragment >
           <Grid container spacing={4}>
            <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
           רישום פרטי ההזמנה
          </Typography>
            <p>כתובת למשלוח ההזמנה</p>
            <MySelectComponent  sendAddressFrom={sendAddressFromfunc}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
      required
      id="orderdate"
      name="orderdate"
      type="date"
      fullWidth
      autoComplete="shipping postal-code"
      variant="standard"
      onChange={(e )=> setDate(e.target.value)}
      InputProps={{
        inputProps: { min: minDate }
      }}
    />
            </Grid>
            <Grid item xs={12} sm={6}>
    <label>:תאריך ביצוע ההזמנה</label>
             </Grid>
           <Grid item xs={12}>
             <Button
                      variant="contained"
                      onClick={ok}
                      sx={{ mt: 3, ml: 1 }}
                      
                    >
אישור                   </Button>
          </Grid>
          </Grid>
         {success && <p>הזמנתך נקלטה במערכת. בדקות הקרובות ישלח אליך מייל עם פירטי ההזמנה. תודה רבה</p>}
        </React.Fragment>
      );
}
