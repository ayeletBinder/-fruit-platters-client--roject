import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useState } from 'react';
import AddTray from './addTray';

const initialState = {
    trays: [],
    status: 'idle'
}

export const fetchtrays = createAsyncThunk(
    'trays/fetchtrays',
    async (thunkAPI) => {
        const response = await axios.get('https://localhost:7262/api/Tray');
        return response.data
    },
)


export const traySlice = createSlice({
    name: 'tray',
    initialState,
    reducers: {
        addTrayToReducer(state,action){
            let f={} 
            for (const [key, value] of action.payload.entries()) {
                f[key]=value
                if(key=='fruitsId[]'){
                    f[key]=[...value]
                }
              }
              debugger
              console.log('fruitsId[]',f.fruitsId)
            state.trays.push(f)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchtrays.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.trays = action.payload
        })
    },
})

export const { addTrayToReducer } = traySlice.actions

export default traySlice.reducer