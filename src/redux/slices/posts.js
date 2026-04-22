import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const {data} = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async ()=>{
    const {data} = await axios.get('/tags')
    return data
})
export const fetchPostsByTags = createAsyncThunk('posts/fetchPostsByTags', async (id)=>{
    const {data} = await axios.get(`/tags/${id}`)
    return data
})
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id)=>{
    const {data} = await axios.delete(`/posts/${id}`)
    return data
})
export const fetchComments = createAsyncThunk('posts/fetchComments', async ()=>{
    const {data} = await axios.get('/comments')
    return data
})


const initialState = {
    posts:{
        items:[],
        status:'loading'
    },
    tags:{
        items:[],
        status:'loading'
    },
    comments:{
        items:[],
        status:'loading'
    },
}

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchPosts.pending]:(state)=>{
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]:(state, actions)=>{
            state.posts.items = actions.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]:(state)=>{
            state.posts.items = []
            state.posts.status = 'error'
        },
        [fetchTags.pending]:(state)=>{
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]:(state, actions)=>{
            state.tags.items = actions.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]:(state)=>{
            state.tags.items = []
            state.tags.status = 'error'
        },
        [fetchRemovePost.pending]:(state,action)=>{
            state.posts.items = state.posts.items.filter(obj=> obj._id !== action.meta.arg)
        },
        [fetchPostsByTags.pending]:(state)=>{
            state.posts.status = 'loading'
        },
        [fetchPostsByTags.fulfilled]:(state, actions)=>{
            state.posts.items = actions.payload
            state.posts.status = 'loaded'
        },
        [fetchPostsByTags.rejected]:(state)=>{
            state.posts.items = []
            state.posts.status = 'error'
        },
        [fetchComments.pending]:(state)=>{
            state.comments.status = 'loading'
        },
        [fetchComments.fulfilled]:(state, actions)=>{
            state.comments.items = actions.payload
            state.comments.status = 'loaded'
        },
        [fetchComments.rejected]:(state)=>{
            state.comments.items = []
            state.comments.status = 'error'
        },
    }
})

export const postReducer = postSlice.reducer