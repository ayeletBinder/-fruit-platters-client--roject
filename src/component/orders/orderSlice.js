import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { date } from 'yup';
import { fetchtrays } from '../trays/traySlice';
import { Send } from '@mui/icons-material';
import { update } from 'react-spring';



const initialState = {
    orders: [],
    status: 'idle'
}


export const useOrder = () => {
    const orders = useSelector(state => state.orders.orders);
    const trays = useSelector(state => state.trays.trays);
    const idClient = useSelector(state => state.clients.id);
    const [filteredorders, setFilteredorders] = useState({});

    const dispatch = useDispatch();
    let o={payment:'',addressToSend:'',priceSum:'',isCompleted:'',clientId:'',orderDate:'',executionDate:'',traysId:[],tries:null}

    const updateOrder=async(order)=>{
      const oldOrder = orders.find(o => o.clientId === idClient && o.isCompleted == false);
      const formData = new FormData();
      formData.append('payment', oldOrder.payment);
      formData.append('addressToSend', order.addressToSend);
      formData.append('priceSum', oldOrder.priceSum);
      formData.append('isCompleted', true);
      formData.append('clientId', oldOrder.clientId);
      console.log(formData.getAll("clientId"))
        try {
          const response = await axios.put(`https://localhost:7262/api/Order/${oldOrder?.id}`,  formData,{
           headers: { "Content-Type": "multipart/form-data"}
      });
            let c={};
            c.addressToSend= order.addressToSend;
            c.id= oldOrder.id;
            //c.executionDate= order.executionDate;
            dispatch(updateOrderReducerTrue(c))
            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
          console.error('Error sending POST request:', error);
        }
      };

    const addToTheCart = async (idTray, idClient) => {
        const order = orders.find(o => o.clientId === idClient && o.isCompleted == false);
        if (order === undefined) {
            o.payment= 0
            o.addressToSend=''
            o.priceSum= 0
            o.isCompleted= false
            o.clientId=idClient
            o.orderDate= new Date()
            o.executionDate= new Date()
            o.traysId= []
            o.traysId.push(idTray)
            try {
                debugger
                const orderResponse = await axios.post('https://localhost:7262/api/Order',o );
                dispatch(AddOrderReducer(orderResponse.data))
            } catch (error) {
                console.error('Error creating order:', error);
            }
        }
        else{
      const order = orders.find(o => o.clientId === idClient && o.isCompleted == false);
      const formData = new FormData();
      formData.append('payment', order.payment);
      formData.append('addressToSend', " jbu");
      formData.append('priceSum', order.priceSum);
      formData.append('isCompleted', false);
      formData.append('clientId', order.clientId);
      formData.append('traysId', idTray);
      console.log(formData.getAll("clientId"))
          try {
            const response = await axios.put(`https://localhost:7262/api/Order/${order?.id}`,formData,{
             headers: { "Content-Type": "multipart/form-data"}
             
        });
            if (response.ok) {
              let c=response.data;
              dispatch(updateOrderReducer(c))
              const data = await response.json();
              console.log('Response from server:', data);
            } else {
              console.error('Server responded with an error:', response.statusText);
            }
            formData.append('id',order?.id)
            let id=order.id;
            let tray = trays.find(t=>t.idTray==idTray)
            dispatch(updateOrderReducer({id,tray}))
          } catch (error) {
            console.error('Error sending POST request:', error);
          }
        }
      }
    return { addToTheCart,updateOrder };
  };
  


export const fetchorders = createAsyncThunk(
    'orders/fetchorders',
    async (thunkAPI) => {
        const response = await axios.get(`https://localhost:7262/api/order`)
        return response.data
    },
)

export const fetchOrdertrays = createAsyncThunk(
  'trays/fetchOrdertrays',
  async (a,thunkAPI) => {
      const response = await axios.get(`https://localhost:7262/api/order/${a.orderId}/${a.trayId}`)
  },
)

export const fetchordersById = createAsyncThunk(
  'orders/fetchordersById',
  async (id,thunkAPI) => {
    debugger
      const response = await axios.get(`https://localhost:7262/api/order${id}`)
      return response.data.image;
  },
)
export const removeorder = createAsyncThunk(
    'orders/removeorder',
    async (id, thunkAPI) => {
        console.log('in removeorder');
        const response = await axios.delete(`https://localhost:7262/api/order/${id}`)
        console.log(response);
        return response.data
    },
)



export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      removeTrayFromOrder(state, action) {
        debugger
        const { orderId, trayId } = action.payload;
        const orderIndex = state.orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
          const trayIndex = state.orders[orderIndex].treis.findIndex(t => t.idTray === trayId);
          if (trayIndex !== -1) {
            state.orders[orderIndex].treis.splice(trayIndex, 1);
          }
        }
        console.log("p",state.orders.treis);
        return state;
      },
      
      updateOrderReducer(state, action) {
        const { id, tray } = action.payload;
           state.orders.map(order => {
            if (order.id === id) {
              order.treis.push(tray);
              return {
                ...order,
              };
            }
            return order;
          })
      },
      AddOrderReducer(state,action){
        const order=action.payload;
        // order.image=fetchordersById(order.id);
        state.orders.push(order);
      },
      updateOrderReducerTrue(state,action){
        // ,executionDate
        const {id, addressToSend}=action.payload;
           state.orders.map(order => {
            if (order.id === id) {
              order.addressToSend=addressToSend;
              order.isCompleted=true;
              // order.executionDate=executionDate;
              return {
                ...order,
              };
            }
            return order;
          })
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchorders.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.orders = action.payload
        })
    },
})

export const {removeTrayFromOrder,updateOrderReducerTrue,AddOrderReducer, updateOrderReducer} = orderSlice.actions

export default orderSlice.reducer