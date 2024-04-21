import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const initialState = {
    id:'',
    admin:false,
    fullName:'',
    clients: [],
    status: 'idle'
}
export const fetchclients = createAsyncThunk(
    'clients/fetchclients',
    async (thunkAPI) => {
        const response = await axios.get('https://localhost:7262/api/Client');
        return response.data
    },
)


export const addClient = (firstName,lastName,email,password,phone,adress)=>
    async (thunkAPI) => {
        console.log('in addClient');
        try{
            const response = await axios.post('https://localhost:7262/api/Client', 
            {
                tz:"1",
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                address:adress,
                phone:phone,
                admin:false
            })
            let client=response.data;
            console.log('client',client);
            return response.data
        }
        catch(err){
            return console.log(err);
        }
    
    }

export const updateClientApi = (firstName,lastName,email,password,phone,adress,admin)=>
    async (id,thunkAPI) => {
        try{
            const response = await axios.put(`https://localhost:7262/api/Client${id}`, 
            {
                tz:"1",
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                address:adress,
                phone:phone,
                admin:admin
            })
            console.log(response);
            return response.data
        }
        catch(err){
            return console.log(err);
        }
    }



export const removeclient = createAsyncThunk(
    'clients/removeclient',
    async (id, thunkAPI) => {
        console.log('in removeclient');
        const response = await axios.delete(`https://localhost:7262/api/client/${id}`)
        console.log(response);
        return response.data
    },
)


export const clientSlice = createSlice({
    fullName:'',
    id:'',
    admin:false,
    name: 'client',
    initialState,
    reducers: {
        updateClientFullName:(state,action)=>{
            state.fullName=action.payload;
        },
        updateClientAdmin:(state,action)=>{
            state.admin=action.payload;
        },
        updateClientId:(state,action)=>{
            state.id=action.payload;
        },
        addClient1:(state,action)=>{
        //     let c={} 
        //     for (const [key, value] of action.payload.entries()) {
        //         c[key] = value;
        //     }
        // console.log("c",c);
        // console.log("state",state.comments);
        state.clients.push(action.payload)
        },
        resetState:(state,action)=>{
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchclients.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.clients = action.payload
        })

    },
})

export const {resetState, addClient1,updateClientFullName,updateClientAdmin,updateClientId} = clientSlice.actions

export default clientSlice.reducer