import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'
import AddFruit from './AddFruit';
import { object } from 'yup';

const initialState = {
    fruits: [],
    status: 'idle'
}


export const fetchfruits = createAsyncThunk(
    'fruits/fetchfruits',
    async (thunkAPI) => {
        const response = await axios.get(`https://localhost:7262/api/Fruit`)
        return response.data
    },
)



export const fruitSlice = createSlice({
    name: 'fruit',
    initialState,
    reducers: {
        addfruit1:(state,action)=>{
            let f={} 
            for (const [key, value] of action.payload.entries()) {
                f[key] = value;
              }
        state.fruits.push(f)
    }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchfruits.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.fruits = action.payload
        })
      
    },
})

export const {addfruit1,updatefruitFullName,updatefruitAdmin} = fruitSlice.actions

export default fruitSlice.reducer