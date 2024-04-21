import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { fetchOrdertrays, removeTrayFromOrder, removeorder } from './orderSlice';
import { fetchtrays } from '../trays/traySlice.js';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function MyOrderTrue() {
    const [filteredorders, setFilteredorders] = useState({});
    const [alert, setAlert] = useState(true);
    const [emptyTrays, setEmptyTrays] = useState(true);
    const orders = useSelector(state => state.orders.orders);
    const idClient = useSelector(state => state.clients.id);
    const dispatch=useDispatch()
    const nav=useNavigate();



    useEffect(() => {
      if(idClient){
      setAlert(false)
      const o=orders.find(o => o.clientId == idClient && o.isCompleted == false)
      setFilteredorders(o)
      if (!filteredorders?.treis) { 
        setEmptyTrays(true)
      } else {
        setEmptyTrays(false) 
      }
        console.log(emptyTrays,'emptyTrays')
      }
    }, [orders,filteredorders]);

    const removeTray=(trayId)=>{
      debugger
      let orderId=filteredorders.id;
      let a={}
      a.orderId=orderId;
      a.trayId=trayId;
      dispatch(removeTrayFromOrder({orderId,trayId}));
      dispatch(fetchOrdertrays(a))

    }
  return ( <> {alert&& <Alert sx={{     width: '222px', height:'5vh',  marginLeft: "30vw" }} severity="warning">אינך מחובר למערכת, יש להתחבר</Alert>}
  {alert==false&&emptyTrays&&<Alert sx={{   width: '222px',  marginLeft: "30vw" }} severity="warning">אין מגשים בסל</Alert>}
    { emptyTrays==false&& alert==false && <TableContainer sx={{width:"100%"}} component={Paper}>
      <Table sx={{ justifyContent: 'center'}} aria-label="simple table">
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
          {filteredorders && filteredorders.treis?.map((tray) => (
            <TableRow
              key={tray?.idTray}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, justifyContent: 'center' }}
            >
              <Button sx={{ marginTop: 2 }} onClick={()=>removeTray(tray.idTray)} type="" variant="contained" color="primary">הסרה מסל קניות</Button>

              <TableCell component="th" scope="row">
                {tray.name}
              </TableCell>
              <TableCell align="right">{tray.description}</TableCell>
              <TableCell align="right">{tray.price}</TableCell>
              {tray?.image &&<Avatar variant="rounded" sx={{width:70,height:70}} src={tray?.image}/>}
              <TableCell align="right"></TableCell>
              <p>  {tray?.price + tray?.fruits.reduce((acc, fruit) => acc + fruit.someAdditional, 0)}</p> 

            </TableRow>
            
          ))}
        </TableBody>
      </Table>
      <p style={{marginLeft:"10px"}}>סה"כ לתשלום:{filteredorders?.treis.reduce((acc, tray) => acc + tray.price, 0)}</p>
      <Button
        variant="contained"
        onClick={()=>nav('/endOrder')}
        sx={{ mt: 3, ml: 1 }}
        
      >
להזמנה ותשלום  </Button>
    </TableContainer>}
    </>
  );
}
