import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchorders, removeorder } from "./orderSlice.js";
import { useLocation } from "react-router";
import { Avatar, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const Allorders = () => {
    const [orderslist,setOrders]=useState([]);
    const orders=useSelector(state => state.orders.orders);
    const status = useSelector(state => state.orders.status);
    const dispatch = useDispatch();
    const location=useLocation();
    useEffect(() => {
        const {client}=location.state;
        if(client){
           let o= orders.filter((o)=>o.clientId==client)
            setOrders(o)
        }
        else{
            setOrders(orders)
        }
    }
  )
  return (
    <>
    
      {orderslist[0] && orderslist?.map((order, index) => (
        <TableContainer component={Paper} key={order.id}   sx={{
            border: '1px solid orange',
            borderRadius: '4px',
            textAlign:'center',
            margin: '16px',
            width:'95%'
          }}>
          
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell>שם המגש</TableCell>
                <TableCell align="right">תיאור</TableCell>
                <TableCell align="right">מחיר</TableCell>
                <TableCell align="right">תמונה</TableCell>
                <TableCell align="right">סה"כ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order && order.treis?.map((tray) => (
                <TableRow key={tray.idTray} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{tray.name}</TableCell>
                  <TableCell align="right">{tray.description}</TableCell>
                  <TableCell align="right">{tray.price}</TableCell>
                  <TableCell align="right">
                    {tray?.image && <Avatar variant="rounded" sx={{ width: 70, height: 70 }} src={tray?.image} />}
                  </TableCell>
                  <TableCell align="right">
                    <p>{tray.price + tray.fruits.reduce((acc, fruit) => acc + fruit.someAdditional, 0)}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider  sx={{backgroundColor:'#ff9800',padding:'0.6px'}}/>
          <p style={{padding:'3px'}}>
          <> {order.addressToSend} <span style={{ fontWeight: 'bold'}}>  :כתובת </span></>
          {order.isCompleted == true &&<div style={{ fontWeight: 'bold'}}> הזמנה סגורה </div>}
          {order.isCompleted == false &&<div style={{ fontWeight: 'bold'}}>  הזמנה בתהליך קניה </div>}
          <span> <span style={{ fontWeight: 'bold' }}> תאריך הזמנה:  </span>{order.orderDate && new Date(order.orderDate).toLocaleDateString('he-IL')}</span>    
          <span> <span style={{ fontWeight: 'bold' }}>  תאריך בקשת הגשה:  </span>{order.executionDate && new Date(order.executionDate).toLocaleDateString('he-IL')}</span>         
          </p>

        </TableContainer>

      ))}
      {!orderslist[0] &&<p>!!!אין הזמנות</p>}

    </>
  );

     
}

export default Allorders