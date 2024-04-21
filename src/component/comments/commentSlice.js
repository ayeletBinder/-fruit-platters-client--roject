import { AddComment } from '@mui/icons-material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import AddNewComment from './AddComment'

const initialState = {
    comments: [],
    status: 'idle'
}


export const fetchcomments = createAsyncThunk(
    'comments/fetchcomments',
    async (thunkAPI) => {
        const response = await axios.get(`https://localhost:7262/api/Comment`)
        const c=response.data;
        return response.data
    },
)

export const removecomment = createAsyncThunk(
    'comments/removecomment',
    async (id, thunkAPI) => {
        console.log('in removecomment');
        const response = await axios.delete(`https://localhost:7262/api/comment/${id}`)
        console.log(response);
        return response.data
    },
)




export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        AddCommentToStore:(state,action)=>{
            let c={} 
            for (const [key, value] of action.payload.entries()) {
                c[key] = value;
              }
        console.log("c",c);
        console.log("state",state.comments);

        state.comments.push(c)
}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcomments.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.comments = action.payload
        })
        
    },
})

export const {AddCommentToStore } = commentSlice.actions

export default commentSlice.reducer